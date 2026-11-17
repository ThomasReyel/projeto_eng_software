from django.contrib import admin
from .models import Cliente


@admin.register(Cliente)
class ClienteAdmin(admin.ModelAdmin):
    list_display = ("id", "nome", "cpf", "email", "status")
    list_filter = ("status",)
    search_fields = ("nome", "cpf", "email")
    ordering = ("nome",)
