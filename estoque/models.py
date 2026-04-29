from django.db import models

class Material(models.Model):
    id = models.AutoField(primary_key=True)
    
    nome = models.CharField(max_length=100, unique=True)
    descricao = models.TextField(blank=True, null=True)
    
    quantidade_estoque = models.IntegerField(default=0)
    
    cor = models.CharField(max_length=20, blank=True, null=True)
    
    unidade_medida = models.CharField(max_length=20)
    
    especificacao_tecnica = models.CharField(max_length=100)
    
    data_cadastro = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'materiais'

    def __str__(self):
        return f"{self.nome} - {self.especificacao_tecnica}"