from django.urls import path, re_path
from .views import (
    idolCmtGetPost,
    idolCmtPutDelete,
    search_result,
    search_by_keyword,
    toggle_like,
    toggle_scrap, request_support,
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
    re_path(
        r"^(?P<scope>group|member)/toggle-like/(?P<idol_id>[0-9]+)/",
        toggle_like,
        name="toggle_like",
    ),
    re_path(
        r"^(?P<scope>group|member)/toggle-scrap/(?P<idol_id>[0-9]+)/",
        toggle_scrap,
        name="toggle_scrap",
    ),
    path("search/<str:keyword>/", search_by_keyword, name="search_by_keyword"),
    path("request-support/", request_support, name="request_support")
]
