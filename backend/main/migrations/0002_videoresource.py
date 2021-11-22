# Generated by Django 3.2.6 on 2021-11-22 14:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='VideoResource',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('videoType', models.IntegerField(default=0)),
                ('resource', models.TextField(default='')),
                ('time', models.DateTimeField(auto_now_add=True)),
                ('size', models.IntegerField(default=0)),
            ],
        ),
    ]
