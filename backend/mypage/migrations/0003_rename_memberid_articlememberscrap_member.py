# Generated by Django 3.2.6 on 2021-11-25 14:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('mypage', '0002_auto_20211125_2354'),
    ]

    operations = [
        migrations.RenameField(
            model_name='articlememberscrap',
            old_name='memberId',
            new_name='member',
        ),
    ]