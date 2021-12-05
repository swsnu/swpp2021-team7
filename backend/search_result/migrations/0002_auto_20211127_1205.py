# Generated by Django 3.2.6 on 2021-11-27 12:05

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("search_result", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="idolgroupinfo",
            name="group",
            field=models.OneToOneField(
                on_delete=django.db.models.deletion.CASCADE,
                primary_key=True,
                related_name="info",
                serialize=False,
                to="search_result.idolgroup",
            ),
        ),
        migrations.AlterField(
            model_name="idolmemberinfo",
            name="member",
            field=models.OneToOneField(
                on_delete=django.db.models.deletion.CASCADE,
                primary_key=True,
                related_name="info",
                serialize=False,
                to="search_result.idolmember",
            ),
        ),
    ]