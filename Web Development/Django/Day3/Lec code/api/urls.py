"""
URL configuration for api_project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.urls import path , include
from .views import ItemViewClass, create_item, register , login , logout , get_items , ItemModelviewset,OrderModelviewset

from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'items-v2', ItemModelviewset, basename='itemviewsets')
router.register(r'orders-v2', OrderModelviewset, basename='orderviewsets')

urlpatterns = [
    path('register/', register, name='register'),
    path('login/', login, name='login'),
    path('logout/', logout, name='logout'),
    path('items/create/', create_item, name='create_item'),
    path('items/all/',get_items, name='get_items'),
    path('items/<int:item_id>/', ItemViewClass.as_view(), name='item_detail'),
    path('', include(router.urls)),
]