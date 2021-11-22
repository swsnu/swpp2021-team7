from django.urls import path
from .views import mmbrCmtGetPost, grpCmtGetPost, mmbrCmtPutDelete, grpCmtPutDelete

urlpatterns = [
    path(
        "comment/member/<int:member_id>/",
        mmbrCmtGetPost,
        name="mmbrCmtGetPost",
    ),
    path(
        "comment/group/<int:member_id>/",
        grpCmtGetPost,
        name="grpCmtGetPost",
    ),
    path(
        "member/comment/<int:comment_id>/",
        mmbrCmtPutDelete,
        name="mmbrCmtPutDelete",
    ),
    path(
        "group/comment/<int:comment_id>/",
        grpCmtPutDelete,
        name="grpCmtPutDelete",
    ),
]
