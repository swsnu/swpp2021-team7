from django.db import models
from django.contrib.auth.models import User
from main.models import ImageResource, VideoResource
from search_result.models.idolMember import IdolMember


class VideoFaceRecognition(models.Model):
    video_id = models.ForeignKey(
        VideoResource, related_name="video_resource_recog", on_delete=models.CASCADE
    )
    user_id = models.ForeignKey(
        User, related_name="video_user_recog", on_delete=models.CASCADE
    )
    location = models.JSONField(default="{}")
    options = models.JSONField(default="{}")
    member_id = models.ForeignKey(
        IdolMember, related_name="idol_member_recog", on_delete=models.CASCADE
    )
    created_at = models.DateTimeField(auto_now_add=True)


class VideoScene(models.Model):
    video_id = models.ForeignKey(
        VideoResource, related_name="video_resource_scene", on_delete=models.CASCADE
    )
    user_id = models.ForeignKey(
        User, related_name="video_user_scene", on_delete=models.CASCADE
    )
    location = models.JSONField(default="{}")
    options = models.JSONField(default="{}")
    created_at = models.DateTimeField(auto_now_add=True)


# scene result sharing
class VideoSceneShare(models.Model):
    result_id = models.ForeignKey(
        VideoScene, related_name="video_scene_share", on_delete=models.CASCADE
    )
    created_at = models.DateTimeField(auto_now_add=True)
    valid = models.BooleanField(default=True)
    description = models.JSONField(default="{}")


# face recognition result sharing
class VideoFaceRecognitionShare(models.Model):
    result_id = models.ForeignKey(
        VideoFaceRecognition,
        related_name="video_face_recog_share",
        on_delete=models.CASCADE,
    )
    created_at = models.DateTimeField(auto_now_add=True)
    valid = models.BooleanField(default=True)
    description = models.JSONField(default="{}")
