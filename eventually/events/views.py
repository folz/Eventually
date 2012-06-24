from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required

def home(req):
    if req.user.is_authenticated():
        return render(req, "home.html", locals())
    else:
        return render(req, "login.html", locals())
