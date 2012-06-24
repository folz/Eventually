from django.db import models

class Event(models.Model):
    name = models.CharField(max_length=127)
    location = models.TextField()
    start = models.DateTimeField(auto_now=False, auto_now_add=False)
    end = models.DateTimeField(auto_now=False, auto_now_add=False)
