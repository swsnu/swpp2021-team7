from django.urls import path
from searchResult import views

urlpatterns = [
    path('searchResult/comment/member/<int:member_id>/', views.mmbrCmtGetPost, name='mmbrCmtGetPost'),
    path('searchResult/comment/group/<int:member_id>/', views.grpCmtGetPost, name='grpCmtGetPost'),
    path('searchResult/member/comment/<int:comment_id>/', views.mmbrCmtPutDelete, name='mmbrCmtPutDelete'),
    path('searchResult/group/comment/<int:comment_id>/', views.grpCmtPutDelete, name='grpCmtPutDelete'),
]
