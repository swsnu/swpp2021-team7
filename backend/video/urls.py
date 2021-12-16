from django.urls import path
from video import views

urlpatterns = [
    path("scene/", views.getScnCut, name="getScnCut"),
    path("recognition/", views.getFaceRecog, name="getFaceRecog"),
]
