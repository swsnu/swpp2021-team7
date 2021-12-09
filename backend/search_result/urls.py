from django.urls import path, re_path
from .views import (
    idolCmtGetPost,
    idolCmtPutDelete,
    search_result,
    search_by_keyword,
)

urlpatterns = [
    re_path(
        r"^(?P<scope>group|member)/(?P<instance_id>[0-9]+)/",
        search_result,
        name="search_result",
    ),
    re_path(
        r"^comment/(?P<scope>group|member)/(?P<idol_id>[0-9]+)/",
        idolCmtGetPost,
        name="mmbrCmtGetPost",
    ),
    re_path(
        r"^(?P<scope>group|member)/comment/(?P<comment_id>[0-9]+)/",
        idolCmtPutDelete,
        name="mmbrCmtPutDelete",
    ),
]
