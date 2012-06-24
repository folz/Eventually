from tastypie import fields
from tastypie.resources import ModelResource

from events.models import *

class EventResource(ModelResource):
    class Meta:
        queryset = Event.objects.all()

class VenueResource(ModelResource):
    event = fields.ForeignKey('events.api.EventResource', 'event')
    
    class Meta:
        queryset = Venue.objects.all()

class SessionResource(ModelResource):
    event = fields.ForeignKey('events.api.EventResource', 'event')
    venue = fields.ForeignKey('events.api.VenueResource', 'venue')
    
    class Meta:
        queryset = Session.objects.all()
