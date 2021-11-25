from django.urls import path
from .views import (
    grpArtcleDelete,
    grpIdolDelete,
    mmbrArtcleDelete,
    mmbrIdolDelete,
    myArtclGet,
    myCmtGet,
    myIdolGet,
    
)

urlpatterns = [
    path("comments/", myCmtGet, name="myCmtGet"),
    path("idols/", myIdolGet, name="myIdolGet"),
    path("articles/", myArtclGet, name="myArtclGet"),
    path(
        "articles/member/<int:article_id>/",
        mmbrArtcleDelete,
        name="mmbrArtcleDelete",
    ),
    path(
        "articles/group/<int:article_id>/",
        grpArtcleDelete,
        name="grpArtcleDelete",
    ),
    path("idols/member/<int:idol_id>/", mmbrIdolDelete, name="mmbrIdolDelete"),
    path("idols/group/<int:idol_id>/", grpIdolDelete, name="grpIdolDelete"),
]
