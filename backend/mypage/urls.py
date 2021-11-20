from django.urls import path
from mypage import views

urlpatterns = [
    path('mypage/comments/', views.myCmtGet, name='myCmtGet'),
    path('mypage/idols/', views.myIdolGet, name='myIdolGet'),
    path('mypage/articles/', views.myArtclGet, name='myArtclGet'),
    path('mypage/articles/member/<int:article_id>/', views.mmbrArtcleDelete, name='mmbrArtcleDelete'),
    path('mypage/articles/group/<int:article_id>/', views.grpArtcleDelete, name='grpArtcleDelete'),
    path('mypage/idols/member/<int:idol_id>/', views.mmbrIdolDelete, name='mmbrIdolDelete'),
    path('mypage/idols/group/<int:idol_id>/', views.grpIdolDelete, name='grpIdolDelete'),
]
