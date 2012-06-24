from django import forms

class EventSearchForm(forms.Form):
    query = forms.CharField()
