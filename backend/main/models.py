from django.db import models
from django.contrib.auth.models import User
from django.db.models.base import Model

class SearchLog(models.Model):
    query = models.TextField(blank=False, default="")
    time = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, related_name='searchLogs',on_delete=models.CASCADE)

class ImageResource(models.Model):
    address = models.TextField(blank=False, default="")
    size = models.IntegerField(default=0)
    time = models.DateTimeField(auto_now_add=True)
    
class IdolGroup(models.Model):
    groupName = models.CharField(max_length=50)
    time = models.DateTimeField(auto_now_add=True)
    valid = models.BooleanField(default=True)
    
class IdolGroupInfo(models.Model):
    groupId = models.ForeignKey(IdolGroup, related_name='idolGroupInfos', on_delete=models.CASCADE)
    groupThumbnail = models.ForeignKey(ImageResource, related_name="idolGroups", on_delete=models.PROTECT)
    groupInfo = models.JSONField(default=dict)
    groupSource = models.JSONField(default=dict)
    valid = models.BooleanField(default=True)
    
class IdolMember(models.Model):
    memberName = models.CharField(max_length=30)
    time = models.DateTimeField(auto_now_add=True)
    valid = models.BooleanField(default=True)
    
class IdolMemberInfo(models.Model):
    memberId = models.ForeignKey(IdolMember, related_name='idolMemberInfos', on_delete=models.CASCADE)
    memberThumbnail = models.ForeignKey(ImageResource, related_name="idolMembers", on_delete=models.PROTECT)
    memberInfo = models.JSONField(default=dict)
    memberSource = models.JSONField(default=dict)
    valid = models.BooleanField(default=True)
    
class IdolMemberIncluded(models.Model):
    groupId = models.ForeignKey(IdolGroup, related_name='memberIncluded', on_delete=models.CASCADE)
    memberId = models.ForeignKey(IdolMember, related_name='groupIncluded', on_delete=models.CASCADE)
    time = models.DateTimeField(auto_now_add=True)
    valid = models.BooleanField(default=True)
    
class GroupComment(models.Model):
    content = models.TextField(blank=False, default="")
    user = models.ForeignKey(User, related_name='groupComments', on_delete=models.CASCADE)
    groupId = models.ForeignKey(IdolGroup, related_name='groupComments', on_delete=models.CASCADE)
    
class MemberComment(models.Model):
    content = models.TextField(blank=False, default="")
    user = models.ForeignKey(User, related_name='memberComments', on_delete=models.CASCADE)
    memberId = models.ForeignKey(IdolMember, related_name='memberComments', on_delete=models.CASCADE)
    
class IdolViewGroupLog(models.Model):
    groupId = models.ForeignKey(IdolGroup, related_name='idolViewGroupLogs', on_delete=models.CASCADE)
    time = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, related_name='idolViewGroupLogs', on_delete=models.CASCADE)


class IdolViemMemberLog(models.Model):
    memberId = models.ForeignKey(IdolMember, related_name='idolViemMemberLogs', on_delete=models.CASCADE)
    time = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, related_name='idolViemMemberLogs', on_delete=models.CASCADE)

class VideoResource(models.Model):
    pass

class ArticleMemberScrap(models.Model):
    address = models.TextField(blank=False, default="")
    time = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, related_name='articleMemberScraps', on_delete=models.CASCADE)
    memberId = models.ForeignKey(IdolMember, related_name='articleMemberScraps', on_delete=models.CASCADE)
    

class ArticleGroupScrap(models.Model):
    address = models.TextField(blank=False, default="")
    time = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, related_name='articleGroupScraps', on_delete=models.CASCADE)
    groupId = models.ForeignKey(IdolGroup, related_name='articleGroupScraps', on_delete=models.CASCADE)


class IdolMemberImage(models.Model):
    pass

class IdolRequest(models.Model):
    pass

class MyIdolGroup(models.Model):
    groupId = models.ForeignKey(IdolGroup, related_name="myIdolGroups", on_delete=models.CASCADE)
    userId = models.ForeignKey(User, related_name='myIdolGroups', on_delete=models.CASCADE)
    time = models.DateTimeField(auto_now_add=True)
    valid = models.BooleanField(default=True)

class MyIdolMember(models.Model):
    memberId = models.ForeignKey(IdolMember, related_name="myIdolMembers", on_delete=models.CASCADE)
    userId = models.ForeignKey(User, related_name='myIdolMembers', on_delete=models.CASCADE)
    time = models.DateTimeField(auto_now_add=True)
    valid = models.BooleanField(default=True)

class VideoRecognitionModel(models.Model):
    pass
    
    
# Create your models here.
