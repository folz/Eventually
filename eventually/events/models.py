from django.db import models

class Event(models.Model):
    name = models.CharField(max_length=127)
    
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
    
    start = models.DateTimeField(auto_now=False, auto_now_add=False)
    end = models.DateTimeField(auto_now=False, auto_now_add=False)
    
    def __unicode__(self):
        return "{0} at {1} [{2} - {3}]".format(
            self.name, self.venue, self.start, self.end)
