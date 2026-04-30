from ninja import NinjaAPI, Schema
from .models import Material
from .schema import MaterialIn, MaterialOut
from typing import List

api = NinjaAPI()

#criar(create)
@api.post("/materiais/", response={201: MaterialOut})
def criar_material(request, data: MaterialIn):
    material = Material.objects.create(**data.dict())
    return 201, material

#ler(read)
@api.get("/materiais/", response=List[MaterialOut])
def listar_materiais(request):
    return Material.objects.all()

#atualizar(update)
@api.put("/materiais/{material_id}", response=MaterialOut)
def atualizar_material(request, material_id: int, data: MaterialIn):
    try:
        material = Material.objects.get(id=material_id)
        for attr, value in data.dict().items():
            setattr(material, attr, value)
        material.save()
        return material
    except Material.DoesNotExist:
        return 404, {"detail": "Material não encontrado"}
    
#deletar(delete)
@api.delete("/materiais/{material_id}", response={204: None})
def deletar_material(request, material_id: int):
    try:
        material = Material.objects.get(id=material_id)
        material.delete()
        return 204, None
    except Material.DoesNotExist:
        return 404, {"detail": "Não foi possível excluir: material inexistente."}
    

