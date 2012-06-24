from tastypie import fields
from tastypie.resources import ModelResource

from events.models import *

class EventResource(ModelResource):
    class Meta:
        queryset = Event.objects.all()
        resource_name = 'event'

class VenueResource(ModelResource):
    event = fields.ForeignKey('events.api.EventResource', 'event')
    
    class Meta:
        queryset = Venue.objects.all()
        resource_name = 'venue'

class SessionResource(ModelResource):
    event = fields.ForeignKey('events.api.EventResource', 'event')
    venue = fields.ForeignKey('events.api.VenueResource', 'venue')
    
    class Meta:
        queryset = Session.objects.all()
