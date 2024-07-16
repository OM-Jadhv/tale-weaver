from django.core.management.base import BaseCommand
from anecdotes.models import Anecdote

class Command(BaseCommand):
    help = 'Adds test data to the database'

    def handle(self, *args, **kwargs):
        anecdotes = [
            {
                'title': 'The Unexpected High-Five',
                "content": "I once tried to high-five a blind person. It didn't go well, but we both laughed about it afterwards.",
                'tags': ['funny', 'awkward']
            },
            {
                'title': 'The Accidental Philosopher',
                "content": "My 5-year-old nephew asked why the sky is blue. I started explaining about light scattering and wavelengths, and he just nodded and said, \"Or maybe it's just God's favorite color.\" I was speechless.",
                'tags': ['kids', 'philosophy']
            },
            {
                'title': 'The Misunderstood Chef',
                "content": "I once told my date I was making \"Chicken Catch a Tony\" for dinner. She looked confused until she realized I meant Chicken Cacciatore.",
                'tags': ['funny', 'food', 'dating']
            },
            {
                'title': 'The Overly Honest Interview',
                "content": "During a job interview, I was asked where I see myself in five years. I said, \"Celebrating the fifth year anniversary of you asking me this question.\" I didn't get the job, but the interviewer did laugh.",
                'tags': ['work', 'humor']
            },
            {
                'title': 'The Surprise Yoga Instructor',
                "content": "I fell asleep on the beach and woke up to find a yoga class had formed around me, thinking I was the instructor in a deep meditative state.",
                'tags': ['beach', 'misunderstanding', 'funny']
            }
        ]

        for anecdote_data in anecdotes:
            Anecdote.objects.create(**anecdote_data)
            self.stdout.write(self.style.SUCCESS(f'Successfully added anecdote: {anecdote_data["title"]}'))

        self.stdout.write(self.style.SUCCESS('Successfully added all test data'))
