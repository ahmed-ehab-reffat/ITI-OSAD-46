from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('students/', views.students, name='students'),
    path('delete/<int:student_id>/', views.delete_student, name='delete_student'),
    path('contact/', views.contact, name='contact'),
]
