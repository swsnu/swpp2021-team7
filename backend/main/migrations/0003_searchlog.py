# Generated by Django 3.2.6 on 2021-11-22 14:39

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('main', '0002_videoresource'),
    ]

    operations = [
        migrations.CreateModel(
            name='SearchLog',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('query', models.TextField(default='')),
                ('isMember', models.BooleanField(default=False)),
                ('time', models.DateTimeField(auto_now_add=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='searchLogs', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
