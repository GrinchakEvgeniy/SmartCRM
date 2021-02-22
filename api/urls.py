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
    path('get-project/<int:pk>', views.GetProjectView.as_view({'get': 'get'}), name="get-project"),
    path('post-projects-simple', views.PostProjectsSimpleView.as_view({'post': 'post'}), name="post-projects-post"),
    path('delete-projects-simple', views.DeleteProjectsSimpleView.as_view({'delete': 'delete'}), name="delete-projects-post"),
    path('put-projects-simple', views.PutProjectsSimpleView.as_view({'put': 'put'}), name="put-projects-post"),
    path('get-project-simple/<int:pk>', views.GetProjectSimpleView.as_view({'get': 'get'}), name="get-projects-post"),

    path('get-clients', views.GetClientsView.as_view({'get': 'get'}), name="get-clients"),
    path('get-client/<int:pk>', views.GetClientView.as_view({'get': 'get'}), name="get-client"),
    path('post-clients', views.PostClientsView.as_view({'post': 'post'}), name="post-clients"),
    path('put-clients', views.PutClientsView.as_view({'put': 'put'}), name="put-clients"),
    path('delete-client', views.DeleteClientView.as_view({'delete': 'delete'}), name="delete-client"),

    path('post-files-project', views.PostFilesProjectView.as_view({'post':'post'}), name="post-files-project"),
    path('delete-files-project', views.DeleteFilesProjectView.as_view({'delete':'delete'}), name="delete-files-project"),

    path('get-roles', views.GetRolesView.as_view({'get':'get'}), name="get-roles"),
    path('post-roles', views.PostRolesView.as_view({'post':'post'}), name="post-roles"),

    path('put-avatar', views.PutAvatarView.as_view({'put':'put'}), name="put-avatar"),

    path('change-user-role', views.ChangeUserRoleView.as_view({'put':'put'}), name="change-user-role"),

    # path('get-events', views.GetEventsView.as_view({'get':'get'}), name="get-events"),
    # path('post-events', views.PostEventsView.as_view({'post':'post'}), name="post-events"),
    # path('delete-events', views.DeleteEventsView.as_view({'delete':'delete'}), name="delete-events"),
    # path('put-events', views.PutEventsView.as_view({'put':'put'}), name="put-events"),
]