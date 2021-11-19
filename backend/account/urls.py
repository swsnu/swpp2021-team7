from django.urls import path
from account import views

urlpatterns = [
    path('token/', views.token, name='token'),
    path('account/signup/', views.signup, name='signup'),
    path('account/signin/', views.signin, name='signin'),
]
