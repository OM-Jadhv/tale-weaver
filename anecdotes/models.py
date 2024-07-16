from django.db import models
from django.contrib.postgres.fields import ArrayField

class Anecdote(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    tags = ArrayField(models.CharField(max_length=50), blank=True)

    def __str__(self):
        return self.title
