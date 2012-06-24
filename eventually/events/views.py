from datetime import datetime

from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required

from events.models import *
from events.forms import *

def home(req):
    events = Event.objects.filter(start__gte=datetime.today()).order_by('start')
    search_form = EventSearchForm()
    
    if req.user.is_authenticated():
        return render(req, "home.html", locals())
    else:
        return render(req, "splash.html", locals())

@login_required
def event(req, eid):
    event = get_object_or_404(Event, pk=eid)
    
    return render(req, "event.html", locals())
