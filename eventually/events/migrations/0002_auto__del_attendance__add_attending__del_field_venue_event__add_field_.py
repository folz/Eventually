# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Deleting model 'Attendance'
        db.delete_table('events_attendance')

        # Adding model 'Attending'
        db.create_table('events_attending', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('person', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['eventually.UserProfile'])),
            ('session', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['events.Session'])),
            ('attending', self.gf('django.db.models.fields.BooleanField')(default=False)),
        ))
        db.send_create_signal('events', ['Attending'])

        # Deleting field 'Venue.event'
        db.delete_column('events_venue', 'event_id')

        # Adding field 'Session.event'
        db.add_column('events_session', 'event',
                      self.gf('django.db.models.fields.related.ForeignKey')(default=1, to=orm['events.Event']),
                      keep_default=False)


    def backwards(self, orm):
        # Adding model 'Attendance'
        db.create_table('events_attendance', (
            ('session', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['events.Session'])),
            ('attending', self.gf('django.db.models.fields.BooleanField')(default=False)),
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('person', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['eventually.UserProfile'])),
        ))
        db.send_create_signal('events', ['Attendance'])

        # Deleting model 'Attending'
        db.delete_table('events_attending')


        # User chose to not deal with backwards NULL issues for 'Venue.event'
        raise RuntimeError("Cannot reverse this migration. 'Venue.event' and its values cannot be restored.")
        # Deleting field 'Session.event'
        db.delete_column('events_session', 'event_id')


    models = {
        'auth.group': {
            'Meta': {'object_name': 'Group'},
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '80'}),
            'permissions': ('django.db.models.fields.related.ManyToManyField', [], {'to': "orm['auth.Permission']", 'symmetrical': 'False', 'blank': 'True'})
        },
        'auth.permission': {
            'Meta': {'ordering': "('content_type__app_label', 'content_type__model', 'codename')", 'unique_together': "(('content_type', 'codename'),)", 'object_name': 'Permission'},
            'codename': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'content_type': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['contenttypes.ContentType']"}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '50'})
        },
        'auth.user': {
            'Meta': {'object_name': 'User'},
            'date_joined': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now'}),
            'email': ('django.db.models.fields.EmailField', [], {'max_length': '75', 'blank': 'True'}),
            'first_name': ('django.db.models.fields.CharField', [], {'max_length': '30', 'blank': 'True'}),
            'groups': ('django.db.models.fields.related.ManyToManyField', [], {'to': "orm['auth.Group']", 'symmetrical': 'False', 'blank': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'is_active': ('django.db.models.fields.BooleanField', [], {'default': 'True'}),
            'is_staff': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'is_superuser': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'last_login': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now'}),
            'last_name': ('django.db.models.fields.CharField', [], {'max_length': '30', 'blank': 'True'}),
            'password': ('django.db.models.fields.CharField', [], {'max_length': '128'}),
            'user_permissions': ('django.db.models.fields.related.ManyToManyField', [], {'to': "orm['auth.Permission']", 'symmetrical': 'False', 'blank': 'True'}),
            'username': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '30'})
        },
        'contenttypes.contenttype': {
            'Meta': {'ordering': "('name',)", 'unique_together': "(('app_label', 'model'),)", 'object_name': 'ContentType', 'db_table': "'django_content_type'"},
            'app_label': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'model': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '100'})
        },
        'events.attending': {
            'Meta': {'object_name': 'Attending'},
            'attending': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'person': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['eventually.UserProfile']"}),
            'session': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['events.Session']"})
        },
        'events.event': {
            'Meta': {'object_name': 'Event'},
            'end': ('django.db.models.fields.DateField', [], {}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '127'}),
            'start': ('django.db.models.fields.DateField', [], {}),
            'venues': ('django.db.models.fields.related.ManyToManyField', [], {'to': "orm['events.Venue']", 'through': "orm['events.Session']", 'symmetrical': 'False'})
        },
        'events.going': {
            'Meta': {'object_name': 'Going'},
            'event': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['events.Event']"}),
            'going': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'person': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['eventually.UserProfile']"}),
            'registration_date': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'})
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
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '127'})
        },
        'eventually.userprofile': {
            'Meta': {'object_name': 'UserProfile'},
            'events': ('django.db.models.fields.related.ManyToManyField', [], {'to': "orm['events.Event']", 'through': "orm['events.Going']", 'symmetrical': 'False'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'sessions': ('django.db.models.fields.related.ManyToManyField', [], {'to': "orm['events.Session']", 'through': "orm['events.Attending']", 'symmetrical': 'False'}),
            'user': ('django.db.models.fields.related.OneToOneField', [], {'to': "orm['auth.User']", 'unique': 'True'})
        }
    }

    complete_apps = ['events']