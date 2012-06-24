from tastypie.resources import ModelResource
from events.models import *

class EventResource(ModelResource):
    class Meta:
        queryset = Event.objects.all()

class VenueResource(ModelResource):
    class Meta:
        queryset = Venue.objects.all()

class SessionResource(ModelResource):
    class Meta:
        queryset = Session.objects.all()
