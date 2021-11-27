# Generated by Django 3.2.6 on 2021-11-27 10:59

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('main', '0001_initial'),
        ('search_result', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='VideoFaceRecognition',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('location', models.JSONField(default=dict)),
                ('options', models.JSONField(default=dict)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('member_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='idol_member_recog', to='search_result.idolmember')),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='video_user_recog', to=settings.AUTH_USER_MODEL)),
                ('video_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='video_resource_recog', to='main.videoresource')),
            ],
        ),
        migrations.CreateModel(
            name='VideoScene',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('location', models.JSONField(default=dict)),
                ('options', models.JSONField(default=dict)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='video_user_scene', to=settings.AUTH_USER_MODEL)),
                ('video_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='video_resource_scene', to='main.videoresource')),
            ],
        ),
        migrations.CreateModel(
            name='VideoSceneShare',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('valid', models.BooleanField(default=True)),
                ('description', models.JSONField(default=dict)),
                ('result_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='video_scene_share', to='video.videoscene')),
            ],
        ),
        migrations.CreateModel(
            name='VideoFaceRecognitionShare',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('valid', models.BooleanField(default=True)),
                ('description', models.JSONField(default=dict)),
                ('result_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='video_face_recog_share', to='video.videofacerecognition')),
            ],
        ),
    ]
