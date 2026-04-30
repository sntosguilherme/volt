# Volt - Sistema de Gerenciamento de Materiais Elétricos

Volt é um CRUD para gerenciamento de estoque de materiais para instalações elétricas prediais desenvolvido com Django Ninja. O projeto utiliza restrições de integridade diretamente no banco de dados e validação de schemas com Pydantic para garantir a consistência dos materiais cadastrados.

## Tecnologias Utilizadas

* **Frontend:** [TypeScript](https://www.typescriptlang.org/)
* **Backend:** Python 3.12+
* **API Framework:** [Django Ninja](https://django-ninja.rest-framework.com/) (FastAPI-style para Django)
* **Banco de Dados:** [SQLite](https://sqlite.org/) 

## Arquitetura e Integridade de Dados

O backend implementa travas automáticas para evitar erros comuns de inventário:

* **Sem Duplicatas**: O banco não aceita dois materiais com a mesma combinação de Nome, Marca, Cor e Unidade.

* **Estoque Positivo**: O sistema bloqueia qualquer tentativa de inserir ou atualizar quantidades para valores negativos.

Validação de Tipos: Uso de Schemas para garantir que os dados recebidos via API estejam no formato correto antes de chegarem ao banco.

## Pré-requisitos

* Python 3.12 ou superior
* Git

## Instalação e Configuração

em breve

---
Desenvolvido por **João Guilherme Silva Santos** ⚡