# Generated by Django 3.2.6 on 2021-12-15 04:50

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('search_result', '0002_auto_20211215_0421'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='idolrequest',
            options={'ordering': ['created_at']},
        ),
        migrations.AlterField(
            model_name='idolrequest',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]