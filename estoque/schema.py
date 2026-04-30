from ninja import Schema
from pydantic import Field
from typing import Optional
from datetime import datetime

class MaterialIn(Schema):
    nome: str
    descricao: Optional[str] = None
    marca: str = "Genérico"  # Adicionado com valor padrão = "Genérico"
    quantidade_estoque: int = Field(default=0, ge=0) # restrição: A quantidade deve ser maior que 0.
    cor: Optional[str] = None
    unidade_medida: str
    especificacao_tecnica: str

class MaterialOut(Schema):
    id: int
    nome: str
    marca: str
    descricao: Optional[str]
    quantidade_estoque: int
    cor: Optional[str]
    unidade_medida: str
    especificacao_tecnica: str
    data_cadastro: datetime 
    
    class Config:
        from_attributes = True