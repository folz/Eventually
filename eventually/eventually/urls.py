from django.conf.urls import patterns, include, url
from django.contrib import admin

admin.autodiscover()

urlpatterns = patterns('',
    
    url(r'^$', 'events.views.home', name='home'),
    
    url(r'^event/(?P<eid>\d+)/', 'events.views.event', name='event'),
    
    
    # Django admin
    
    url(r'^admin/', include(admin.site.urls)),
    
    
    # Django-registration
    
    url(r'^accounts/', include('registration.backends.default.urls')),

)
