from django.urls import path
from . import views
from rest_framework.authtoken.views import obtain_auth_token


urlpatterns = [
    path('api-token-auth/', obtain_auth_token, name='api_token_auth'),

    path('get-user', views.GetUserView.as_view({'get': 'get'}), name='get-user'),
    path('put-user', views.PutUserView.as_view({'put': 'put'}), name='put-user'),
    path('post-user', views.PostUserView.as_view({'post': 'post'}), name='post-user'),
    path('get-users', views.GetUsersView.as_view({'get': 'get'}), name='get-users'),
    path('delete-user', views.DeleteUsersView.as_view({'delete': 'delete'}), name='delete-users'),

    path('get-projects-simple', views.GetProjectsSimpleView.as_view({'get': 'get'}), name="get-projects-simple"),
    path('post-projects-simple', views.PostProjectsSimpleView.as_view({'post': 'post'}), name="post-projects-post"),

    path('get-clients', views.GetClientsView.as_view({'get': 'get'}), name="get-clients"),
    path('get-client/<int:pk>', views.GetClientView.as_view({'get': 'get'}), name="get-client"),
    path('post-clients', views.PostClientsView.as_view({'post': 'post'}), name="post-clients"),
    path('put-clients', views.PutClientsView.as_view({'put': 'put'}), name="put-clients"),
    path('delete-client', views.DeleteClientView.as_view({'delete': 'delete'}), name="delete-client"),
]