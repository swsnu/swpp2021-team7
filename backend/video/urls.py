from django.urls import path
from video import views

urlpatterns = [
<<<<<<< HEAD
    path("scene/", views.getScnCut, name="getScnCut"),
=======
    path("video/scene/", views.getScnCut, name="getScnCut"),
    path("video/recognition/", views.getFaceRecog, name="getFaceRecog"),
    path("video/re-recognition/", views.getReFaceRecog, name="getReFaceRecog"),
    path("video/share/", views.postShare, name="postShare"),
>>>>>>> a8028afa38a7748e5dd4fae45858ff84c7bb7485
]
