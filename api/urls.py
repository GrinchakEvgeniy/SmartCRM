from django.urls import path
from . import views
from rest_framework.authtoken.views import obtain_auth_token


urlpatterns = [
    path('api-token-auth/', obtain_auth_token, name='api_token_auth'),

    path('get-user', views.UserView.as_view({'get': 'get'}), name='get-user'),
]