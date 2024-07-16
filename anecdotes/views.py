from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Anecdote
from .serializers import AnecdoteSerializer
import random
from django.contrib.postgres.aggregates import ArrayAgg
from django.db.models import Func

class AnecdoteViewSet(viewsets.ModelViewSet):
    queryset = Anecdote.objects.all()
    serializer_class = AnecdoteSerializer

    @action(detail=False, methods=['get'])
    def random(self, request):
        anecdotes = list(Anecdote.objects.all())
        if anecdotes:
            random_anecdote = random.choice(anecdotes)
            serializer = self.get_serializer(random_anecdote)
            return Response(serializer.data)
        return Response({'detail': 'No anecdotes available'}, status=404)

    @action(detail=False, methods=['get'])
    def search_by_tags(self, request):
        tags = request.query_params.get('tags', '').split(',')
        anecdotes = Anecdote.objects.filter(tags__overlap=tags)
        serializer = self.get_serializer(anecdotes, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def all_tags(self, request):
        # Use ArrayAgg and Unnest to get all unique tags
        tags = Anecdote.objects.annotate(
            unnested_tags=Func(
                'tags',
                function='unnest'
            )
        ).values_list('unnested_tags', flat=True).distinct()
        
        return Response(list(tags))
