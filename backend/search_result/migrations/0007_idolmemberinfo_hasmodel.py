# Generated by Django 3.2.6 on 2021-12-11 02:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('search_result', '0006_auto_20211209_1151'),
    ]

    operations = [
        migrations.AddField(
            model_name='idolmemberinfo',
            name='hasModel',
            field=models.BooleanField(default=False),
        ),
    ]