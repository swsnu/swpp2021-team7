from django.urls import path
from .views import (
    grp_artcle_delete,
    grpIdolDelete,
    mmbr_artcle_delete,
    mmbrIdolDelete,
    my_artcl_get,
    my_cmt_get,
    my_idol_get,
)

urlpatterns = [
    path("comments/", my_cmt_get, name="myCmtGet"),
    path("idols/", my_idol_get, name="myIdolGet"),
    path("articles/", my_artcl_get, name="myArtclGet"),
    path(
        "articles/member/<int:article_id>/",
        mmbr_artcle_delete,
        name="mmbrArtcleDelete",
    ),
    path(
        "articles/group/<int:article_id>/",
        grp_artcle_delete,
        name="grpArtcleDelete",
    ),
    path("idols/member/<int:idol_id>/", mmbrIdolDelete, name="mmbrIdolDelete"),
    path("idols/group/<int:idol_id>/", grpIdolDelete, name="grpIdolDelete"),
]
