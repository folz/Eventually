from datetime import datetime

from django.db import models

pick = {'auto_now': False, 'auto_now_add': False}

class Event(models.Model):
    name = models.CharField(max_length=127)
    start = models.DateField(**pick)
    end = models.DateField(**pick)
    
    def __unicode__(self):
        return self.name

class Venue(models.Model):
    event = models.ForeignKey('Event')
    name = models.CharField(max_length=127)
    
    def __unicode__(self):
        return "{0} - {1}".format(self.name, self.event.name)

class Session(models.Model):
    name = models.CharField(max_length=127)
    venue = models.ForeignKey('Venue')
    
    start = models.DateTimeField(**pick)
    end = models.DateTimeField(**pick)
    
    def __unicode__(self):
        return "{0} at {1} from {2} to {3}".format(
            self.name, self.venue,
            self.start.strftime("%b %d %I:%M %p"),
            self.end.strftime("%b %d %I:%M %p"))

class Attendance(models.Model):
    person = models.ForeignKey('eventually.UserProfile')
    event = models.ForeignKey('Event')
    
    attending = models.BooleanField()
    registration_date = models.DateTimeField(auto_now_add=True)
    
    def __unicode__(self):
        return "{0} is {1}going to {2}".format(
            self.person, "" if self.attending else "not ", self.event)
