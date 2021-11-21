from django.urls import path
from video import views

urlpatterns = [
    path('video/scene/', views.getScnCut, name='getScnCut'),
]
