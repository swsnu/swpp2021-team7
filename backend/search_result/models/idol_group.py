from django.contrib.auth.models import User
from django.db import models
from django.utils.timezone import now
from main.models import ImageResource


class IdolGroup(models.Model):
    name = models.JSONField(default=dict)  # kor, eng
    valid = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)


class IdolGroupInfo(models.Model):
    group = models.OneToOneField(
        IdolGroup, related_name="info", on_delete=models.CASCADE, primary_key=True
    )
    thumbnail = models.OneToOneField(
        ImageResource, on_delete=models.SET_NULL, null=True, blank=True
    )
    info = models.JSONField(default=dict)  # news, tweets(instagram posts), youtubes
    source = models.JSONField(default=dict)
    valid = models.BooleanField(default=True)

    updated_at = models.DateTimeField(null=True)

    def to_basic_info(self):
        return {
            "thumbnail": self.thumbnail.address if self.thumbnail else "",
            "info": {
                "name": self.group.name,
                "debut": self.info["데뷔"] if "데뷔" in self.info else "",
                "members": [
                    member.to_group_response() for member in self.group.members.all()
                ],
            },
            "news": self.info["news"] if "news" in self.info else [],
        }

    def apply_updates(self, news, youtubes, twitter, save=False):
        self.info["news"] = news
        self.info["youtubes"] = youtubes
        self.info["twitter"] = twitter
        self.updated_at = now()

        if save:
            self.save(update_fields=["info", "updated_at"])


class GroupComment(models.Model):
    content = models.TextField(blank=False, default="")
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    idol = models.ForeignKey(IdolGroup, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def to_response_format(self):
        obj = {
            "author": self.user.username,
            "content": self.content,
        }

        if self.created_at != self.updated_at:
            obj["updated_at"] = self.updated_at
        else:
            obj["created_at"] = self.created_at

        return obj


class IdolViewGroupLog(models.Model):
    group = models.ForeignKey(
        IdolGroup, related_name="idolViewGroupLogs", on_delete=models.CASCADE
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(
        User, related_name="idolViewGroupLogs", on_delete=models.CASCADE
    )
