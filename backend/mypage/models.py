from django.contrib.auth.models import User
from django.db import models
from search_result.models import IdolMember, IdolGroup


class MyIdolGroup(models.Model):
    group = models.ForeignKey(
        IdolGroup, related_name="myIdolGroups", on_delete=models.CASCADE
    )
    user = models.ForeignKey(
        User, related_name="myIdolGroups", on_delete=models.CASCADE
    )
    time = models.DateTimeField(auto_now_add=True)
    valid = models.BooleanField(default=True)


class MyIdolMember(models.Model):
    member = models.ForeignKey(
        IdolMember, related_name="myIdolMembers", on_delete=models.CASCADE
    )
    user = models.ForeignKey(
        User, related_name="myIdolMembers", on_delete=models.CASCADE
    )
    time = models.DateTimeField(auto_now_add=True)
    valid = models.BooleanField(default=True)


class ArticleGroupScrap(models.Model):
    title = models.TextField(blank=False, default="")
    address = models.TextField(blank=False, default="")
    time = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(
        User, related_name="articleGroupScraps", on_delete=models.CASCADE
    )
    group = models.ForeignKey(
        IdolGroup, related_name="articleGroupScraps", on_delete=models.CASCADE
    )


class ArticleMemberScrap(models.Model):
    title = models.TextField(blank=False, default="")
    address = models.TextField(blank=False, default="")
    time = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(
        User, related_name="articleMemberScraps", on_delete=models.CASCADE
    )
    member = models.ForeignKey(
        IdolMember, related_name="articleMemberScraps", on_delete=models.CASCADE
    )
