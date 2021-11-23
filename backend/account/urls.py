from django.urls import path
from account.views import (
    token,
    signup,
    signin
)

urlpatterns = [
    path("token/", token, name="token"),
    path("signup/", signup, name="signup"),
    path("signin/", signin, name="signin"),
]
