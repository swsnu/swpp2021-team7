<<<<<<< HEAD
# Generated by Django 3.2.6 on 2021-11-27 03:17
=======
# Generated by Django 3.2.6 on 2021-11-26 13:47
>>>>>>> a8028afa38a7748e5dd4fae45858ff84c7bb7485

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('search_result', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='MyIdolMember',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('time', models.DateTimeField(auto_now_add=True)),
                ('valid', models.BooleanField(default=True)),
                ('member', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='myIdolMembers', to='search_result.idolmember')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='myIdolMembers', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='MyIdolGroup',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('time', models.DateTimeField(auto_now_add=True)),
                ('valid', models.BooleanField(default=True)),
                ('group', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='myIdolGroups', to='search_result.idolgroup')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='myIdolGroups', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='ArticleMemberScrap',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
<<<<<<< HEAD
                ('title', models.TextField(default='')),
                ('address', models.TextField(default='')),
                ('time', models.DateTimeField(auto_now_add=True)),
                ('member', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='articleMemberScraps', to='search_result.idolmember')),
=======
                ('address', models.TextField(default='')),
                ('time', models.DateTimeField(auto_now_add=True)),
                ('memberId', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='articleMemberScraps', to='search_result.idolmember')),
>>>>>>> a8028afa38a7748e5dd4fae45858ff84c7bb7485
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='articleMemberScraps', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='ArticleGroupScrap',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
<<<<<<< HEAD
                ('title', models.TextField(default='')),
=======
>>>>>>> a8028afa38a7748e5dd4fae45858ff84c7bb7485
                ('address', models.TextField(default='')),
                ('time', models.DateTimeField(auto_now_add=True)),
                ('group', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='articleGroupScraps', to='search_result.idolgroup')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='articleGroupScraps', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
