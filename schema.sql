CREATE DATABASE IF NOT EXISTS volt_materiais;
USE volt_materiais

-- EXEMPLOS DE MATERIAIS: DISJUNTORES, CONDUTORES, CONDUITES, etc.

CREATE TABLE IF NOT EXISTS materiais(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    marca VARCHAR(50) DEFAULT 'Genérico', -- A marca é relevante para alguns materiais (disjuntores, condutores, e outros), mas para outros pode ser irrelevante. Por isso, se nenhum valor for informado, subentende-se que é 'Genérico'.
    descricao TEXT,
    quantidade_estoque INT DEFAULT 0 CHECK (quantidade_estoque >= 0) -- Quantidade em estoque, não pode ser negativa, e se nenhum valor for informado subentende-se que é 0.
    cor VARCHAR(20), -- Informação útil para condutores mas nem tanto para disjuntores ou outros elementos. 
    unidade_medida VARCHAR(20) NOT NULL, -- Ex: 'Rolo 100m', 'Pacote 20m', 'Unidade'
    especificacao_tecnica VARCHAR(100) NOT NULL, -- EX: '20A', '1.5 mm²', '3/4'
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP

    UNIQUE(nome, marca, cor, unidade_medida)
);