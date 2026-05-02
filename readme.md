# ⚡ Volt — Sistema de Gerenciamento de Materiais Elétricos

Volt é um CRUD para gerenciamento de estoque de materiais para instalações elétricas prediais. O projeto utiliza restrições de integridade diretamente no banco de dados e validação de schemas com Pydantic para garantir a consistência dos materiais cadastrados.
Volt foi desenvolvido como uma forma de exercitar a programação end-to-end. O projeto inclui frontend, backend e persistencia de dados com um banco de dados. 

## Tecnologias Utilizadas

| Camada | Tecnologia |
|---|---|
| Frontend | [TypeScript](https://www.typescriptlang.org/) |
| Backend | Python 3.12+ |
| API Framework | [Django Ninja](https://django-ninja.rest-framework.com/) |
| Banco de Dados | [SQLite](https://sqlite.org/) |

## Arquitetura e Integridade de Dados

O backend implementa travas automáticas para evitar erros comuns de inventário:

- **Sem duplicatas**: o banco não aceita dois materiais com a mesma combinação de Nome, Marca, Cor e Unidade de Medida.
- **Estoque positivo**: qualquer tentativa de inserir ou atualizar quantidades para valores negativos é bloqueada por constraint no banco.
- **Validação de tipos**: schemas Pydantic garantem que os dados recebidos via API estejam no formato correto antes de chegarem ao banco.

---

## Pré-requisitos

- [Python 3.12+](https://www.python.org/downloads/)
- [Node.js](https://nodejs.org/) (para o frontend)
- [Git](https://git-scm.com/)

---

## Instalação e Configuração

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/volt.git
cd volt
```

### 2. Configure o backend

Crie e ative um ambiente virtual:

```bash
# Linux / macOS
python -m venv venv
source venv/bin/activate

# Windows
python -m venv venv
venv\Scripts\activate
```

Instale as dependências Python:

```bash
pip install -r requirements.txt
```
Configure as variáveis de ambiente. Crie um arquivo `.venv` na raiz do projeto:

```

Aplique as migrações e inicialize o banco de dados:

```bash
python manage.py migrate
```

### 3. Configure o frontend

```bash
cd frontend   # ou o diretório onde está o código TypeScript
npm install
```

---

## Execução

### Backend

Com o ambiente virtual ativado, na raiz do projeto:

```bash
python manage.py runserver
```

A API estará disponível em `http://127.0.0.1:8000`.

A documentação interativa (Swagger UI) gerada automaticamente pelo Django Ninja pode ser acessada em:

```
http://127.0.0.1:8000/api/docs
```

### Frontend

```bash
cd frontend
npm run dev
```

---

## Estrutura do Banco de Dados

A tabela principal `materiais` armazena os itens do estoque com os seguintes campos:

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | INT | Chave primária, auto incremento |
| `nome` | VARCHAR(100) | Nome do material |
| `marca` | VARCHAR(50) | Marca (padrão: `Genérico`) |
| `descricao` | TEXT | Descrição opcional |
| `quantidade_estoque` | INT | Quantidade em estoque (≥ 0, padrão: `0`) |
| `cor` | VARCHAR(20) | Cor do material (útil para condutores) |
| `unidade_medida` | VARCHAR(20) | Ex: `Rolo 100m`, `Unidade` |
| `especificacao_tecnica` | VARCHAR(100) | Ex: `20A`, `1.5 mm²`, `3/4` |
| `data_cadastro` | TIMESTAMP | Data de cadastro (automática) |

> **Restrição única:** a combinação de `nome + marca + cor + unidade_medida` deve ser única.

---

Desenvolvido por **João Guilherme Silva Santos**
