from django.urls import path, re_path
from .views import (
    mmbrCmtGetPost,
    grpCmtGetPost,
    mmbrCmtPutDelete,
    grpCmtPutDelete,
    search_result,
    search_by_keyword,
)

urlpatterns = [
    re_path(
        r"^(?P<scope>group|member)/(?P<instance_id>[0-9]+)/",
        search_result,
        name="search_result",
    ),
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
    path(
        "search/<str:keyword>/",
        search_by_keyword,
        name="search_by_keyword"
    )
]
