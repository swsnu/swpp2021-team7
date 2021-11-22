from django.contrib.auth.models import User
from django.db import models
from main.models import ImageResource
from .idolGroup import IdolGroup


class IdolMember(models.Model):
    name = models.JSONField(default=dict)  # kor, eng
    time = models.DateTimeField(auto_now_add=True)
    valid = models.BooleanField(default=True)


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


class IdolMemberIncluded(models.Model):
    group = models.ForeignKey(
        IdolGroup, related_name="members", on_delete=models.CASCADE
    )
    member = models.ForeignKey(
        IdolMember, related_name="groups", on_delete=models.CASCADE
    )
    time = models.DateTimeField(auto_now_add=True)
    valid = models.BooleanField(default=True)


class MemberComment(models.Model):
    content = models.TextField(blank=False, default="")
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    member = models.ForeignKey(IdolMember, on_delete=models.CASCADE)


class IdolViewMemberLog(models.Model):
    member = models.ForeignKey(IdolMember, on_delete=models.CASCADE)
    time = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)


class IdolMemberImage(models.Model):
    pass
