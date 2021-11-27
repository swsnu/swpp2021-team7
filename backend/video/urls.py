from django.urls import path
from video import views

urlpatterns = [
    path("scene/", views.getScnCut, name="getScnCut"),
    path("video/scene/", views.getScnCut, name="getScnCut"),
    path("video/recognition/", views.getFaceRecog, name="getFaceRecog"),
    path("video/re-recognition/", views.getReFaceRecog, name="getReFaceRecog"),
    path("video/share/", views.postShare, name="postShare"),
]
