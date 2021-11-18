from django.db import models
from django.contrib.auth.models import User
from django.db.models.base import Model

class searchLog(models.Model):
    query = models.TextField(blank=False, default="")
    time = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, related_name='searchLogs',on_delete=models.CASCADE)

class imageResource(models.Model):
    address = models.TextField(blank=False, default="")
    size = models.IntegerField(default=0)
    time = models.DateTimeField(auto_now_add=True)
    
class idolGroup(models.Model):
    groupName = models.CharField(max_length=50)
    time = models.DateTimeField(auto_now_add=True)
    valid = models.BooleanField(default=True)
    
class idolGroupInfo(models.Model):
    groupId = models.ForeignKey(idolGroup, related_name='idolGroupInfos', on_delete=models.CASCADE)
    groupThumbnail = models.ForeignKey(imageResource, related_name="idolGroups", on_delete=models.PROTECT)
    groupInfo = models.JSONField(default=dict)
    groupSource = models.JSONField(default=dict)
    valid = models.BooleanField(default=True)
    
class idolMember(models.Model):
    memberName = models.CharField(max_length=30)
    time = models.DateTimeField(auto_now_add=True)
    valid = models.BooleanField(default=True)
    
class idolMemberInfo(models.Model):
    memberId = models.ForeignKey(idolMember, related_name='idolMemberInfos', on_delete=models.CASCADE)
    memberThumbnail = models.ForeignKey(imageResource, related_name="idolMembers", on_delete=models.PROTECT)
    memberInfo = models.JSONField(default=dict)
    memberSource = models.JSONField(default=dict)
    valid = models.BooleanField(default=True)
    
class idolMemberIncluded(models.Model):
    groupId = models.ForeignKey(idolGroup, related_name='memberIncluded', on_delete=models.CASCADE)
    memberId = models.ForeignKey(idolMember, related_name='groupIncluded', on_delete=models.CASCADE)
    time = models.DateTimeField(auto_now_add=True)
    valid = models.BooleanField(default=True)
    
class groupComment(models.Model):
    content = models.TextField(blank=False, default="")
    user = models.ForeignKey(User, related_name='groupComments', on_delete=models.CASCADE)
    groupId = models.ForeignKey(idolGroup, related_name='groupComments', on_delete=models.CASCADE)
    
class memberComment(models.Model):
    content = models.TextField(blank=False, default="")
    user = models.ForeignKey(User, related_name='memberComments', on_delete=models.CASCADE)
    memberId = models.ForeignKey(idolMember, related_name='memberComments', on_delete=models.CASCADE)
    
class idolViewGroupLog(models.Model):
    groupId = models.ForeignKey(idolGroup, related_name='idolViewGroupLogs', on_delete=models.CASCADE)
    time = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, related_name='idolViewGroupLogs', on_delete=models.CASCADE)


class idolViemMemberLog(models.Model):
    memberId = models.ForeignKey(idolMember, related_name='idolViemMemberLogs', on_delete=models.CASCADE)
    time = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, related_name='idolViemMemberLogs', on_delete=models.CASCADE)

class videoResource(models.Model):
    pass

class articleMemberScrap(models.Model):
    address = models.TextField(blank=False, default="")
    time = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, related_name='articleMemberScraps', on_delete=models.CASCADE)
    memberId = models.ForeignKey(idolMember, related_name='articleMemberScraps', on_delete=models.CASCADE)
    

class articleGroupScrap(models.Model):
    address = models.TextField(blank=False, default="")
    time = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, related_name='articleGroupScraps', on_delete=models.CASCADE)
    groupId = models.ForeignKey(idolGroup, related_name='articleGroupScraps', on_delete=models.CASCADE)


class idolMemberImage(models.Model):
    pass

class idolRequest(models.Model):
    pass

class myIdolGroup(models.Model):
    groupId = models.ForeignKey(idolGroup, related_name="myIdolGroups", on_delete=models.CASCADE)
    userId = models.ForeignKey(User, related_name='myIdolGroups', on_delete=models.CASCADE)
    time = models.DateTimeField(auto_now_add=True)
    valid = models.BooleanField(default=True)

class myIdolMember(models.Model):
    memberId = models.ForeignKey(idolMember, related_name="myIdolMembers", on_delete=models.CASCADE)
    userId = models.ForeignKey(User, related_name='myIdolMembers', on_delete=models.CASCADE)
    time = models.DateTimeField(auto_now_add=True)
    valid = models.BooleanField(default=True)

class videoRecognitionModel(models.Model):
    pass
    
    
# Create your models here.
