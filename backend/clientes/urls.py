# clientes/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import ClienteViewSet

# O router cria automaticamente as rotas:
#   GET    /clientes/          -> list
#   POST   /clientes/          -> create
#   GET    /clientes/{id}/     -> retrieve
#   PUT    /clientes/{id}/     -> update
#   PATCH  /clientes/{id}/     -> partial_update
#   DELETE /clientes/{id}/     -> destroy
router = DefaultRouter()
router.register(r'clientes', ClienteViewSet, basename='cliente')

urlpatterns = [
    path('', include(router.urls)),
]