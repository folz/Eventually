from django.contrib.auth.models import User

from tastypie import fields
from tastypie.resources import ModelResource

from eventually.models import *

class UserResource(ModelResource):
    class Meta:
        queryset = User.objects.all()
        resource_name = 'user'

class UserProfileResource(ModelResource):
    user = fields.ForeignKey(User, 'user')
    
    class Meta:
        queryset = UserProfile.objects.all()

class GoingResource(ModelResource):
    person = fields.ForeignKey('eventually.api.UserProfileResource', 'user')
    event = fields.ForeignKey('events.api.EventResource', 'event')
    
    class Meta:
        queryset = Going.objects.all()

class AttendingResource(ModelResource):
    person = fields.ForeignKey('eventually.api.UserProfileResource', 'user')
    session = fields.ForeignKey('events.api.SessionResource', 'session')
    
    class Meta:
        queryset = Attending.objects.all()
