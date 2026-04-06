from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import RedirectView
from django.contrib.auth.decorators import login_required
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('registration/', include('django.contrib.auth.urls')),
    path('registration/register/', views.register, name='register'),
    path('registration/profile/', login_required(views.profile), name='profile'),
    path('', RedirectView.as_view(url='/students/')),
    path('students/', include('students.urls')),
    path('subjects/', include('subjects.urls')),
    path('grades/', include('grades.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
