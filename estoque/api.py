from ninja import NinjaAPI, Schema
from django.db import IntegrityError
from .models import Material
from .schema import MaterialIn, MaterialOut
from typing import List

api = NinjaAPI()

#criar(create)
@api.post("/materiais/", response={201: MaterialOut, 400: dict})
def criar_material(request, data: MaterialIn):
    try:
        material = Material.objects.create(**data.dict())
        return 201, material
    except IntegrityError:
        return 400, {"detail": "Material duplicado ou quantidade negativa"}

#ler(read)
@api.get("/materiais/", response=List[MaterialOut])
def listar_materiais(request):
    return Material.objects.all()

#atualizar(update)
@api.put("/materiais/{material_id}", response={200: MaterialOut, 404: dict, 400: dict})
def atualizar_material(request, material_id: int, data: MaterialIn):
    try:
        material = Material.objects.get(id=material_id)
        for attr, value in data.dict().items():
            setattr(material, attr, value)
        material.save()
        return material
    except Material.DoesNotExist:
        return 404, {"detail": "Material não encontrado"}
    except IntegrityError:
        return 400, {"detail": "Dados inválidos"}
    
#deletar(delete)
@api.delete("/materiais/{material_id}", response={204: None, 404: dict})
def deletar_material(request, material_id: int):
    try:
        material = Material.objects.get(id=material_id)
        material.delete()
        return 204, None
    except Material.DoesNotExist:
        return 404, {"detail": "Não foi possível excluir: material inexistente."}
    

