CREATE DATABASE IF NOT EXISTS volt_materiais;
USE volt_materiais

-- EXEMPLOS DE MATERIAIS: DISJUNTORES, CONDUTORES, CONDUITES,

CREATE TABLE IF NOT EXISTS materiais(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    quantidade_estoque INT DEFAULT 0,
    cor VARCHAR(20), -- Informação útil para condutores. 
    unidade_medida VARCHAR(20) NOT NULL, -- Ex: 'Rolo 100m', 'Pacote 20m', 'Unidade'
    especificacao_tecnica VARCHAR(100) NOT NULL, -- EX: '20A', '1.5 mm²', '3/4'
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);