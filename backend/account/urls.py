from django.urls import path
from .views import (
    token,
    signup,
    signin
)

urlpatterns = [
    path("token/", token, name="token"),
    path("signup/", signup, name="signup"),
    path("signin/", signin, name="signin"),
]
