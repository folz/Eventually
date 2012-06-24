from django.contrib import admin

from events.models import *

class SessionInline(admin.StackedInline):
    model = Session
    ordering = ["start"]

class VenueAdmin(admin.ModelAdmin):
    inlines = (SessionInline,)

class VenueInline(admin.StackedInline):
    model = Venue

class EventAdmin(admin.ModelAdmin):
    inlines = (VenueInline,)

admin.site.register(Event, EventAdmin)
admin.site.register(Attendance)
admin.site.register(Venue, VenueAdmin)
