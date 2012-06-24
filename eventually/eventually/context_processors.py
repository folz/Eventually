from django.contrib.sites.models import Site
from django.core.urlresolvers import resolve

def site(request):
    return {
        'site': Site.objects.get_current()
    }

def url_name(request):
    return {
        'url_name': resolve(request.get_full_path()).url_name,
    }

