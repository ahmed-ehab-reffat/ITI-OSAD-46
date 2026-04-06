from django.urls import path , include
from .views import register , login , logout , StudentModelviewset, SubjectModelviewset, GradeModelviewset
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'students', StudentModelviewset, basename='studentviewsets')
router.register(r'subjects', SubjectModelviewset, basename='subjectviewsets')
router.register(r'grades', GradeModelviewset, basename='gradeviewsets')

urlpatterns = [
    path('register/', register, name='register'),
    path('login/', login, name='login'),
    path('logout/', logout, name='api_logout'),
    path('', include(router.urls)),
]
