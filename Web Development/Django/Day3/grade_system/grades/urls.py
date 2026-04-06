from django.urls import path
from . import views

urlpatterns = [
    path('', views.grade_list, name='grade_list'),
    path('add/', views.grade_create, name='grade_create'),
    path('<int:pk>/', views.grade_detail, name='grade_detail'),
    path('<int:pk>/edit/', views.grade_update, name='grade_update'),
    path('<int:pk>/delete/', views.grade_delete, name='grade_delete'),
    path('leaderboard/', views.leaderboard, name='leaderboard'),
]
