# Generated by Django 3.2.6 on 2021-11-19 15:37

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='myidolgroup',
            old_name='userId',
            new_name='user',
        ),
        migrations.RenameField(
            model_name='myidolmember',
            old_name='userId',
            new_name='user',
        ),
    ]
