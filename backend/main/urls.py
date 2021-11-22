from django.urls import path
from main.views import (
    rankingInfoGet
)

urlpatterns = [
    
    path(
        "ranking/",
        rankingInfoGet,
        name="rankingInfoGet",
    )
]
