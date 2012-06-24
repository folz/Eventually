from django.db import models

from django.contrib.auth.models import User
from django.db.models.signals import post_save

from events.models import *

class UserProfile(models.Model):
    user = models.OneToOneField(User)
    
    events = models.ManyToManyField('events.Event')

def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)

post_save.connect(create_user_profile, sender=User)
