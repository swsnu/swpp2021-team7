from django.urls import path
from account import views

urlpatterns = [
    path('token/', views.token, name='token'),
    path('signup/', views.signup, name='signup'),
    path('signin/', views.signin, name='signin'),
]
