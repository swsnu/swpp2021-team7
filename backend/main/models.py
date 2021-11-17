from django.db import models
from django.contrib.auth.models import User

class searchLog(models.Model):
    query = models.TextField(blank=False)
    time = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, related_name='searchLogs',on_delete=models.CASCADE)
    
class idolViewGroupLog(models.Model):
    pass

class idolViemMemberLog(models.Model):
    pass

class idolGroup(models.Model):
    groupName = models.CharField(max_length=50)
    time = models.DateTimeField(auto_now_add=True)
    valid = models.BooleanField(default=True)
    
class idolGroupInfo(models.Model):
    groupId = models.ForeignKey(idolGroup, related_name='idolGroupInfos', on_delete=models.CASCADE)
    groupThumbnail = models.CharField(max_length=50)
    groupInfo = models.JSONField(default='{}')
    groupSource = models.JSONField(default='{}')
    valid = models.BooleanField(default=True)
    
class idolMember(models.Model):
    memberName = models.CharField(max_length=30)
    time = models.DateTimeField(auto_now_add=True)
    valid = models.BooleanField(default=True)
    
class idolMemberInfo(models.Model):
    memberId = models.ForeignKey(idolMember, related_name='idolMemberInfos', on_delete=models.CASCADE)
    memberThumbnail = models.CharField(max_length=50)
    memberInfo = models.JSONField(default='{}')
    memberSource = models.JSONField(default='{}')
    valid = models.BooleanField(default=True)
    
class idolMemberIncluded(models.Model):
    groupId = models.ForeignKey(idolGroup, related_name='memberIncluded', on_delete=models.CASCADE)
    memberId = models.ForeignKey(idolMember, related_name='groupIncluded', on_delete=models.CASCADE)
    time = models.DateTimeField(auto_now_add=True)
    valid = models.BooleanField(default=True)
    
class groupComment(models.Model):
    content = models.TextField(blank=False)
    user = models.ForeignKey(User, related_name='groupComments', on_delete=models.CASCADE)
    groupId = models.ForeignKey(idolGroup, related_name='groupComments', on_delete=models.CASCADE)
    
class memberComment(models.Model):
    content = models.TextField(blank=False)
    user = models.ForeignKey(User, related_name='memberComments', on_delete=models.CASCADE)
    memberId = models.ForeignKey(idolMember, related_name='memberComments', on_delete=models.CASCADE)
    
class videoResource(models.Model):
    pass

class articleMemberScrap(models.Model):
    pass

class articleGroupScrap(models.Model):
    pass

class imageResource(models.Model):
    pass

class idolMemberImage(models.Model):
    pass

class idolRequest(models.Model):
    pass

class myIdolGroup(models.Model):
    pass

class myIdolMember(models.Model):
    pass

class videoRecognitionModel(models.Model):
    pass
    
    
# Create your models here.
