from django.contrib.auth.models import User
from django.db import models
from main.models import ImageResource


class IdolGroup(models.Model):
    name = models.JSONField(default=dict)  # kor, eng
    time = models.DateTimeField(auto_now_add=True)
    valid = models.BooleanField(default=True)


class IdolGroupInfo(models.Model):
    group = models.OneToOneField(IdolGroup, on_delete=models.CASCADE, primary_key=True)
    thumbnail = models.OneToOneField(
        ImageResource, on_delete=models.SET_NULL, null=True, blank=True
    )
    info = models.JSONField(default=dict)  # news, tweets(instagram posts), youtubes
    source = models.JSONField(default=dict)
    valid = models.BooleanField(default=True)

    def to_basic_info(self):
        return {
            "thumbnail": self.thumbnail.address,
            "info": {
                "name": self.group.name,
                "debut": self.info["debut"],
                "members": [member.name_and_thumbnail for member in self.group.members],
            },
            "news": self.info["news"],
        }


class GroupComment(models.Model):
    content = models.TextField(blank=False, default="")
    user = models.ForeignKey(
        User, related_name="groupComments", on_delete=models.CASCADE
    )
    group = models.ForeignKey(
        IdolGroup, related_name="groupComments", on_delete=models.CASCADE
    )


class IdolViewGroupLog(models.Model):
    group = models.ForeignKey(
        IdolGroup, related_name="idolViewGroupLogs", on_delete=models.CASCADE
    )
    time = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(
        User, related_name="idolViewGroupLogs", on_delete=models.CASCADE
    )