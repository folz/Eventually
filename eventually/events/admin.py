from django.contrib import admin

from events.models import *

admin.site.register(Event)
admin.site.register(Venue)
admin.site.register(Session)
