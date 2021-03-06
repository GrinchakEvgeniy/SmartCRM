from django.urls import path
from . import views

urlpatterns = [
    path('', views.main),
    path('login', views.login, name='login-page'),
    path('dashboard', views.dashboard, name='dashboard'),
    path('dashboard/clients', views.dashboard, name='clients'),
    path('dashboard/profile', views.dashboard, name='profile'),
    path('dashboard/users', views.dashboard, name='users'),
    path('dashboard/users-time', views.dashboard, name='users-time'),
    path('dashboard/salary', views.dashboard, name='salary'),
    path('dashboard/projects', views.dashboard, name='projects'),
    path('dashboard/project/<int:pk>', views.dashboard, name='projects-single'),
    path('dashboard/notifications', views.dashboard, name='notifications'),
    path('dashboard/events', views.dashboard, name='events'),
    path('dashboard/info', views.dashboard, name='info'),
    path('dashboard/projects-time', views.dashboard, name='projects-time'),
]
