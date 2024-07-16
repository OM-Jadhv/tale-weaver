from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from anecdotes.views import AnecdoteViewSet

router = DefaultRouter()
router.register(r'anecdotes', AnecdoteViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]
