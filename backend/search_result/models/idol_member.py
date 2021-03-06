from django.contrib.auth.models import User
from django.db import models
from django.utils.timezone import now
from main.models import ImageResource
from .idol_group import IdolGroup


class IdolMember(models.Model):
    name = models.JSONField(default=dict)  # kor, eng
    valid = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)


class IdolMemberInfo(models.Model):
    member = models.OneToOneField(
        IdolMember, related_name="info", on_delete=models.CASCADE, primary_key=True
    )
    thumbnail = models.OneToOneField(
        ImageResource, on_delete=models.SET_NULL, null=True, blank=True
    )
    info = models.JSONField(default=dict)
    source = models.JSONField(default=dict)
    valid = models.BooleanField(default=True)
    hasModel = models.BooleanField(default=False)
    updated_at = models.DateTimeField(null=True)

    def to_basic_info(self):
        return {
            "thumbnail": self.thumbnail.address if self.thumbnail else "",
            "info": {
                "name": self.member.name,
                "birth": self.info["출생"] if "출생" in self.info else "",
                "groups": [
                    group.to_member_response() for group in self.member.groups.all()
                ],
            },
            "hasModel": self.hasModel,
            "news": self.info["news"] if "news" in self.info else [],
        }

    def apply_updates(self, news, youtubes, tweets, save=False):
        self.info["news"] = news
        self.info["youtubes"] = youtubes
        self.info["tweets"] = tweets
        self.updated_at = now()

        if save:
            self.save(update_fields=["info", "updated_at"])


class IdolMemberIncluded(models.Model):
    group = models.ForeignKey(
        IdolGroup, related_name="members", on_delete=models.CASCADE
    )
    member = models.ForeignKey(
        IdolMember, related_name="groups", on_delete=models.CASCADE
    )
    time = models.DateTimeField(auto_now_add=True)
    valid = models.BooleanField(default=True)

    def to_group_response(self):
        return {
            "id": self.member.id,
            "name": self.member.name["kor"],
            "thumbnail": self.member.info.thumbnail.address
            if self.member.info.thumbnail
            else "",
        }

    def to_member_response(self):
        return {
            "id": self.group.id,
            "name": self.group.name["kor"],
        }


class MemberComment(models.Model):
    content = models.TextField(blank=False, default="")
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    idol = models.ForeignKey(IdolMember, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def to_response_format(self, user_id):
        obj = {
            "author": self.user.username,
            "isMine": self.user.id == user_id,
            "content": self.content,
            "created_at": self.created_at,
            "id": self.id,
        }

        return obj


class IdolViewMemberLog(models.Model):
    member = models.ForeignKey(IdolMember, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class IdolMemberImage(models.Model):
    image = models.ForeignKey(ImageResource, on_delete=models.CASCADE)
    member = models.ForeignKey(IdolMember, on_delete=models.CASCADE)
    position = models.JSONField(default=dict)
    time = models.DateTimeField(auto_now_add=True)
