from django.urls import path
from main.views import ranking_info_get

urlpatterns = [
    path(
        "ranking/",
        ranking_info_get,
        name="rankingInfoGet",
    )
]
