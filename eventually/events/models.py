from datetime import datetime

from django.db import models
from django.contrib.auth.models import User

pick = {'auto_now': False, 'auto_now_add': False}

class Event(models.Model):
    name = models.CharField(max_length=127)
    created_by = models.ForeignKey(User, related_name="creator")
    administrators = models.ManyToManyField(User)
    
    start = models.DateField(**pick)
    end = models.DateField(**pick)
    
    def __unicode__(self):
        return self.name

class Session(models.Model):
    name = models.CharField(max_length=127)
    event = models.ForeignKey('Event')
    venue = models.ForeignKey('Venue')
    
    start = models.DateTimeField(**pick)
    end = models.DateTimeField(**pick)
    
    def __unicode__(self):
        return "{0} at {1} from {2} to {3}".format(
            self.name, self.venue,
            self.start.strftime("%b %d %I:%M %p"),
            self.end.strftime("%b %d %I:%M %p"))

class Venue(models.Model):
    name = models.CharField(max_length=127)
    event = models.ForeignKey('Event')
    
    def __unicode__(self):
        return "{0} - {1}".format(self.name, self.event.name)
