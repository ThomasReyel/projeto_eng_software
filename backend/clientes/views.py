# clientes/views.py
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action


class ClienteViewSet(viewsets.ViewSet):
    """
    Placeholder — será implementado na issue de CRUD de clientes.
    Por enquanto responde 200 para não quebrar o roteamento.
    """

    def list(self, request):
        return Response({"detail": "Clientes: em implementação"})

    def retrieve(self, request, pk=None):
        return Response({"detail": f"Cliente {pk}: em implementação"})