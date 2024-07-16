from rest_framework import serializers
from .models import Anecdote

class AnecdoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Anecdote
        fields = ['id', 'title', 'content', 'tags']
