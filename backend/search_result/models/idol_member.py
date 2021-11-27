from django.contrib.auth.models import User
from django.db import models
from main.models import ImageResource
from .idol_group import IdolGroup


class IdolMember(models.Model):
    name = models.JSONField(default=dict)  # kor, eng
    valid = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class IdolMemberInfo(models.Model):
    member = models.OneToOneField(
        IdolMember, on_delete=models.CASCADE, primary_key=True
    )
    thumbnail = models.OneToOneField(
        ImageResource, on_delete=models.SET_NULL, null=True, blank=True
    )
    info = models.JSONField(default=dict)
    source = models.JSONField(default=dict)
    valid = models.BooleanField(default=True)

    def to_basic_info(self):
        return {
            "thumbnail": self.thumbnail.address,
            "info": {
                "name": self.member.name,
                "birth": self.info["출생"] if "출생" in self.info else "",
            },
            "news": self.info["news"] if "news" in self.info else [],
        }


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
            "thumbnail": self.member.idolmemberinfo.thumbnail.address,
        }


class MemberComment(models.Model):
    content = models.TextField(blank=False, default="")
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    member = models.ForeignKey(IdolMember, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


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
