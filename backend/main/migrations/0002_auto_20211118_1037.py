# Generated by Django 3.2.6 on 2021-11-18 01:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='idolgroup',
            name='valid',
            field=models.BooleanField(default=True),
        ),
        migrations.AlterField(
            model_name='idolgroupinfo',
            name='valid',
            field=models.BooleanField(default=True),
        ),
        migrations.AlterField(
            model_name='idolmember',
            name='valid',
            field=models.BooleanField(default=True),
        ),
        migrations.AlterField(
            model_name='idolmemberincluded',
            name='valid',
            field=models.BooleanField(default=True),
        ),
        migrations.AlterField(
            model_name='idolmemberinfo',
            name='valid',
            field=models.BooleanField(default=True),
        ),
    ]
