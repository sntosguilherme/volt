from ninja import NinjaAPI, Schema
from typing import List
from .schema import MaterialIn, MaterialOut
from .models import Material

api = NinjaAPI()

#criar(create)
@api.post("/materiais", response={201: MaterialOut})
def criar_material(request, data: MaterialIn):
    material = Material.objects.create(**data.dict())
    return 201, material

#ler(read)
@api.get("/materiais", response=List[MaterialOut])
def listar_materiais(request):
    return Material.objects.all()