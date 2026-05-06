import pytest
from django.db import IntegrityError
from estoque.models import Material

#Testes presentes em test_material.py:
# testes basicos das operações de CRUD
# teste da restrição de quantidade negativa
# teste da restrição de materiais duplicados

@pytest.mark.django_db(transaction=True)
class TestMaterialRestrictions:
    
    # TESTES DE CRUD
    def test_create(self, client):
        response = client.post('/api/materiais/', {
            'nome': 'Disjuntor',
            'marca': 'Siemens',
            'unidade_medida': 'Unidade',
            'especificacao_tecnica': '20A',
            'quantidade_estoque': 5
        }, content_type='application/json')
        assert response.status_code == 201

    def test_list_materials(self, client, sample_material):
        response = client.get('/api/materiais/')
        assert response.status_code == 200
        assert len(response.json()) == 1
    
    def test_update_material(self, client, sample_material):
        response = client.put(f'/api/materiais/{sample_material.id}', {
            'nome': sample_material.nome,
            'marca': sample_material.marca,
            'cor': sample_material.cor,
            'unidade_medida': sample_material.unidade_medida,
            'especificacao_tecnica': sample_material.especificacao_tecnica,
            'quantidade_estoque': 20
        }, content_type='application/json')
        assert response.status_code == 200
        assert response.json()['quantidade_estoque'] == 20
    
    def test_delete_material(self, client, sample_material):
        response = client.delete(f'/api/materiais/{sample_material.id}')
        assert response.status_code == 204
        assert not Material.objects.filter(id=sample_material.id).exists()

    # TESTES DE RESTRIÇÕES

    # teste para garantir a restrição de quantidade negativa
    def test_reject_negative_amount(self, client):
        response = client.post('/api/materiais/', {
            'nome': 'Material',
            'unidade_medida': 'Unidade',
            'especificacao_tecnica': 'Test',
            'quantidade_estoque': -5
        }, content_type='application/json')
        assert response.status_code == 422
    
    # teste para garantir que materiais duplicados não sejam criados
    def test_reject_duplicates(self, client):
        client.post('/api/materiais/', {
            'nome': 'Condutor',
            'marca': 'Pirelli',
            'cor': 'Vermelho',
            'unidade_medida': 'Rolo 100m',
            'especificacao_tecnica': '1.5 mm²'
        }, content_type='application/json')
        
        response = client.post('/api/materiais/', {
            'nome': 'Condutor',
            'marca': 'Pirelli',
            'cor': 'Vermelho',
            'unidade_medida': 'Rolo 100m',
            'especificacao_tecnica': '2.5 mm²'
        }, content_type='application/json')
        assert response.status_code == 400