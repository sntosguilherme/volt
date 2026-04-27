# Recriando o conteúdo do README.md conforme estruturado anteriormente para exportação direta.

readme_content = """# Volt ⚡

O **Volt** é um sistema de gerenciamento de inventário (CRUD) focado em materiais de instalações elétricas prediais. O objetivo do projeto é permitir o controle simplificado de estoque, lidando com diferentes tipos de materiais como condutores, disjuntores e conduítes em uma interface unificada.

## 🚀 Tecnologias

Este projeto utiliza uma stack moderna e robusta:

- **Frontend:** [TypeScript](https://www.typescriptlang.org/)
- **Backend:** [Python](https://www.python.org/) com [Django Ninja](https://django-ninja.rest-api.cn/) (Fast, Type-safe API)
- **Banco de Dados:** [MySQL](https://www.mysql.com/)

## 📋 Funcionalidades

- **Cadastro de Materiais:** Registro de itens com especificações técnicas (amperagem, bitola, diâmetro).
- **Controle de Estoque:** Gerenciamento de quantidades baseado em unidades de medida específicas (Rolo 100m, Pacote 20m, Unidade).
- **Diferenciação por Cores:** Campo específico para identificação de condutores (fios/cabos).
- **Listagem em Tempo Real:** Visualização de todos os itens cadastrados com data de registro.

## 🗄️ Estrutura do Banco de Dados

O projeto utiliza uma tabela única polimórfica para simplificar o CRUD, mantendo a flexibilidade para diferentes componentes:

```sql
CREATE TABLE materiais (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    quantidade_estoque INT DEFAULT 0,
    cor VARCHAR(20),
    unidade_medida VARCHAR(20) NOT NULL,
    especificacao_tecnica VARCHAR(100) NOT NULL,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);