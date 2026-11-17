from django.db import models


class Cliente(models.Model):
    nome = models.CharField(max_length=150, null=False, blank=False)
    data_nascimento = models.DateField(null=False, blank=False)
    endereco = models.CharField(max_length=255, null=False, blank=False)
    telefone = models.CharField(max_length=20, null=False, blank=False)
    cpf = models.CharField(max_length=14, unique=True, null=False, blank=False)
    email = models.EmailField(max_length=254, unique=True, null=False, blank=False)
    status = models.BooleanField(default=True, null=False, blank=False)

    class Meta:
        verbose_name = "Cliente"
        verbose_name_plural = "Clientes"

    def __str__(self):
        return f"{self.nome} ({self.cpf})"
