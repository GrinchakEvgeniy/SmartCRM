from django.urls import path
from . import views

urlpatterns = [
    path('', views.main),
    path('login', views.login, name='login-page'),
    path('dashboard', views.dashboard, name='dashboard'),
    path('dashboard/clients', views.dashboard, name='clients'),
    path('dashboard/profile', views.dashboard, name='profile'),
    path('dashboard/users', views.dashboard, name='users'),
    path('dashboard/projects', views.dashboard, name='projects'),
    path('dashboard/projectControl', views.dashboard, name='projects-single')
]
