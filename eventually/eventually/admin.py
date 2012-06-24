from django.contrib import admin

from eventually.models import *

class AttendanceInline(admin.StackedInline):
    model = UserProfile.events.through

class UserProfileAdmin(admin.ModelAdmin):
    inlines = (AttendanceInline,)

admin.site.register(UserProfile, UserProfileAdmin)
