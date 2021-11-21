from django.urls import path
from mypage import views

urlpatterns = [
    path('comments/', views.myCmtGet, name='myCmtGet'),
    path('idols/', views.myIdolGet, name='myIdolGet'),
    path('articles/', views.myArtclGet, name='myArtclGet'),
    path('articles/member/<int:article_id>/', views.mmbrArtcleDelete, name='mmbrArtcleDelete'),
    path('articles/group/<int:article_id>/', views.grpArtcleDelete, name='grpArtcleDelete'),
    path('idols/member/<int:idol_id>/', views.mmbrIdolDelete, name='mmbrIdolDelete'),
    path('idols/group/<int:idol_id>/', views.grpIdolDelete, name='grpIdolDelete'),
]
