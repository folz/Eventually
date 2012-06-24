from django.contrib import admin

from eventually.models import *
from events.models import *

admin.site.register(UserProfile)

admin.site.register(Event)
admin.site.register(Venue)
admin.site.register(Session)
