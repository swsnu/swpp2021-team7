from django.urls import path
from video import views

urlpatterns = [
<<<<<<< HEAD
=======
    path("scene/", views.getScnCut, name="getScnCut"),
>>>>>>> 8b3c7edf4a1a912ee2d094e79a5f51970d0a69ca
    path("video/scene/", views.getScnCut, name="getScnCut"),
    path("video/recognition/", views.getFaceRecog, name="getFaceRecog"),
    path("video/re-recognition/", views.getReFaceRecog, name="getReFaceRecog"),
    path("video/share/", views.postShare, name="postShare"),
]
