from django.urls import path
from . import views
from rest_framework.authtoken.views import obtain_auth_token


urlpatterns = [
    path('api-token-auth/', obtain_auth_token, name='api_token_auth'),
    path('get-user', views.UserView.as_view({'get': 'get'}), name='get-user'),

    path('get-projects-simple', views.GetProjectsSimpleView.as_view({'get':'get'}), name="get-projects-simple"),
    path('post-projects-simple', views.PostProjectsSimpleView.as_view({'post':'post'}), name="post-projects-post"),

    path('get-clients', views.GetClientsView.as_view({'get':'get'}), name="get-clients"),
    path('post-clients', views.PostClientsView.as_view({'post':'post'}), name="post-clients")
]