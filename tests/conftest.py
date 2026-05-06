# tests/conftest.py
import pytest
from django.test import Client
from estoque.models import Material

@pytest.fixture
def client():
    return Client()

@pytest.fixture(autouse=True)
def db_reset(db):
    Material.objects.all().delete()
    yield
    Material.objects.all().delete()

# fixture para criar um material de exemplo para os testes
@pytest.fixture
def sample_material(db):
    return Material.objects.create(
        nome="Condutor",
        marca="Pirelli",
        cor="Vermelho",
        unidade_medida="Rolo 100m",
        especificacao_tecnica="1.5 mm²",
        quantidade_estoque=10
    )