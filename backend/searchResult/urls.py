from django.urls import path
from searchResult import views

urlpatterns = [
    path('comment/member/<int:member_id>/', views.mmbrCmtGetPost, name='mmbrCmtGetPost'),
    path('comment/group/<int:member_id>/', views.grpCmtGetPost, name='grpCmtGetPost'),
    path('member/comment/<int:comment_id>/', views.mmbrCmtPutDelete, name='mmbrCmtPutDelete'),
    path('group/comment/<int:comment_id>/', views.grpCmtPutDelete, name='grpCmtPutDelete'),
]
