from django.urls import path
from .views import token, signup, signin, signout, isLogin

urlpatterns = [
    path("token/", token, name="token"),
    path("signup/", signup, name="signup"),
    path("signin/", signin, name="signin"),
    path("signout/", signout, name="signout"),
    path("islogin/", isLogin, name="isLogin")
]
