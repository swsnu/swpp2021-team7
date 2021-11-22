from django.db import models
from django.contrib.auth.models import User


class SearchLog(models.Model):
    query = models.TextField(blank=False, default="")
    time = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, related_name="searchLogs", on_delete=models.CASCADE)


class ImageResource(models.Model):
    address = models.TextField(blank=False, default="")
    size = models.IntegerField(default=0)
    time = models.DateTimeField(auto_now_add=True)


class VideoResource(models.Model):
    pass
