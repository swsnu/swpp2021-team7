# Generated by Django 3.2.6 on 2021-12-11 07:44

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('main', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='IdolGroup',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.JSONField(default=dict)),
                ('valid', models.BooleanField(default=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='IdolMember',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.JSONField(default=dict)),
                ('valid', models.BooleanField(default=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='IdolRequest',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
        migrations.CreateModel(
            name='MemberComment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.TextField(default='')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('idol', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='search_result.idolmember')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='IdolViewMemberLog',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('member', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='search_result.idolmember')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='IdolViewGroupLog',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('group', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='idolViewGroupLogs', to='search_result.idolgroup')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='idolViewGroupLogs', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='IdolMemberIncluded',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('time', models.DateTimeField(auto_now_add=True)),
                ('valid', models.BooleanField(default=True)),
                ('group', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='members', to='search_result.idolgroup')),
                ('member', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='groups', to='search_result.idolmember')),
            ],
        ),
        migrations.CreateModel(
            name='IdolMemberImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('position', models.JSONField(default=dict)),
                ('time', models.DateTimeField(auto_now_add=True)),
                ('image', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.imageresource')),
                ('member', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='search_result.idolmember')),
            ],
        ),
        migrations.CreateModel(
            name='GroupComment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.TextField(default='')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('idol', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='search_result.idolgroup')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='IdolMemberInfo',
            fields=[
                ('member', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, related_name='info', serialize=False, to='search_result.idolmember')),
                ('info', models.JSONField(default=dict)),
                ('source', models.JSONField(default=dict)),
                ('valid', models.BooleanField(default=True)),
                ('hasModel', models.BooleanField(default=False)),
                ('updated_at', models.DateTimeField(null=True)),
                ('thumbnail', models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='main.imageresource')),
            ],
        ),
        migrations.CreateModel(
            name='IdolGroupInfo',
            fields=[
                ('group', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, related_name='info', serialize=False, to='search_result.idolgroup')),
                ('info', models.JSONField(default=dict)),
                ('source', models.JSONField(default=dict)),
                ('valid', models.BooleanField(default=True)),
                ('updated_at', models.DateTimeField(null=True)),
                ('thumbnail', models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='main.imageresource')),
            ],
        ),
    ]
