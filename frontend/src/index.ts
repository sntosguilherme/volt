import axios from 'axios';

// Suas interfaces já definidas...
export interface Material {
  id?: number;
  nome: string;
  quantidade_estoque: number;
  unidade_medida: string;
  // ... outros campos
}

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', 
});

// 1. Função que BUSCA os dados
export const buscarDados = async (): Promise<Material[]> => {
  try {
    const response = await api.get('/materiais/'); // Barra final é vital!
    return response.data;
  } catch (error) {
    console.error("Erro na API:", error);
    return [];
  }
};

// 2. Função que ESCREVE no HTML (O que estava faltando)
const renderizarTela = async () => {
  const listaElemento = document.getElementById('lista-materiais');
  if (!listaElemento) return;

  listaElemento.innerHTML = "<li>Carregando...</li>";

  const materiais = await buscarDados();
  console.log("Materiais para renderizar:", materiais);

  if (materiais.length === 0) {
    listaElemento.innerHTML = "<li>Nenhum material encontrado. Cadastre no Swagger!</li>";
    return;
  }

  listaElemento.innerHTML = materiais.map(m => `
    <li>
      <strong>${m.nome}</strong> - ${m.quantidade_estoque} unidades
    </li>
  `).join('');
};

// 3. EXECUÇÃO (O "Main")
renderizarTela();