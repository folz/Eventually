# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Deleting model 'Going'
        db.delete_table('events_going')

        # Deleting model 'Attending'
        db.delete_table('events_attending')

        # Adding field 'Venue.event'
        db.add_column('events_venue', 'event',
                      self.gf('django.db.models.fields.related.ForeignKey')(default=1, to=orm['events.Event']),
                      keep_default=False)


    def backwards(self, orm):
        # Adding model 'Going'
        db.create_table('events_going', (
            ('registration_date', self.gf('django.db.models.fields.DateTimeField')(auto_now_add=True, blank=True)),
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('person', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['eventually.UserProfile'])),
            ('going', self.gf('django.db.models.fields.BooleanField')(default=False)),
            ('event', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['events.Event'])),
        ))
        db.send_create_signal('events', ['Going'])

        # Adding model 'Attending'
        db.create_table('events_attending', (
            ('session', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['events.Session'])),
            ('attending', self.gf('django.db.models.fields.BooleanField')(default=False)),
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('person', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['eventually.UserProfile'])),
        ))
        db.send_create_signal('events', ['Attending'])

        # Deleting field 'Venue.event'
        db.delete_column('events_venue', 'event_id')


    models = {
        'events.event': {
            'Meta': {'object_name': 'Event'},
            'end': ('django.db.models.fields.DateField', [], {}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '127'}),
            'start': ('django.db.models.fields.DateField', [], {})
        },
        'events.session': {
            'Meta': {'object_name': 'Session'},
            'end': ('django.db.models.fields.DateTimeField', [], {}),
            'event': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['events.Event']"}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '127'}),
            'start': ('django.db.models.fields.DateTimeField', [], {}),
            'venue': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['events.Venue']"})
        },
        'events.venue': {
            'Meta': {'object_name': 'Venue'},
            'event': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['events.Event']"}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '127'})
        }
    }

    complete_apps = ['events']