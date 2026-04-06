from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import RedirectView
from django.contrib.auth.decorators import login_required
from rest_framework.routers import DefaultRouter
from students.api_views import StudentViewSet
from subjects.api_views import SubjectViewSet
from grades.api_views import GradeViewSet, LeaderboardAPIView
from . import views

router = DefaultRouter()
router.register(r'students', StudentViewSet)
router.register(r'subjects', SubjectViewSet)
router.register(r'grades', GradeViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('registration/', include('django.contrib.auth.urls')),
    path('registration/register/', views.register, name='register'),
    path('registration/profile/', login_required(views.profile), name='profile'),
    path('', RedirectView.as_view(url='/students/')),
    path('students/', include('students.urls')),
    path('subjects/', include('subjects.urls')),
    path('grades/', include('grades.urls')),
    path('api/', include('api.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
