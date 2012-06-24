from django.contrib import admin

from eventually.models import *

class AttendingInline(admin.StackedInline):
    model = UserProfile.events.through

class UserProfileAdmin(admin.ModelAdmin):
    inlines = (AttendingInline,)

admin.site.register(UserProfile, UserProfileAdmin)
