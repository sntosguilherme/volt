import axios from 'axios';

export interface Material {
  id?: number;
  nome: string;
  marca?: string;
  cor?: string; 
  especificacao_tecnica?: string;
  quantidade_estoque: number;
  unidade_medida: string;
}

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', 
});

// 1. Função que BUSCA os dados do backend
export const buscarDados = async (): Promise<Material[]> => {
  try {
    const response = await api.get('/materiais/');
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    return [];
  }
};

//Função de cadastro de um novo material
const cadastrarMaterial = async (evento: Event) => {
  evento.preventDefault(); // Impede o reload da página

  // Captura dos elementos do formulário (conforme os IDs do seu HTML)
  const nome = (document.getElementById('nome') as HTMLInputElement).value;
  const marca = (document.getElementById('marca') as HTMLInputElement).value;
  const cor = (document.getElementById('cor') as HTMLInputElement).value;
  const espec = (document.getElementById('especificacao_tecnica') as HTMLInputElement).value;
  const quantidade = (document.getElementById('quantidade') as HTMLInputElement).value;
  const unidade = (document.getElementById('unidade') as HTMLInputElement).value;

  // montando o objeto conforme a interface Material, garantindo que os campos estejam corretos
  const novoMaterial: Material = {
    nome: nome,
    marca: marca,
    cor: cor,
    especificacao_tecnica: espec, // Mapeando o ID com hífen para o campo do backend
    quantidade_estoque: parseInt(quantidade),
    unidade_medida: unidade,
  };

  // Enviando o POST para o backend
  try {
    await api.post('/materiais/', novoMaterial);
    alert("Material adicionado ao Volt!");
    
    // Limpa o formulário após o sucesso
    (evento.target as HTMLFormElement).reset();
    
    // Atualiza a lista na tela sem precisar dar F5
    renderizarTela(); 
  } catch (error) {
    console.error("Erro ao cadastrar:", error);
    alert("Erro ao salvar. Verifique se o backend está rodando.");
  }
};

// Função que renderiza a lista no HTML
const renderizarTela = async () => {
  const listaElemento = document.getElementById('lista-materiais');
  if (!listaElemento) return;

  listaElemento.innerHTML = "<li>Carregando estoque...</li>";

  const materiais = await buscarDados();

  if (materiais.length === 0) {
    listaElemento.innerHTML = "<li>O estoque está vazio. Adicione um material acima!</li>";
    return;
  }

  // gerando o HTML para cada material usando template literals, garantindo que os campos opcionais sejam tratados corretamente
  listaElemento.innerHTML = materiais.map(m => `
    <li style="margin-bottom: 10px; list-style: none; border-bottom: 1px solid #eee;">
      <strong>${m.nome}</strong> - ${m.quantidade_estoque} ${m.unidade_medida} <br>
      <small>Marca: ${m.marca || 'N/A'} | Cor: ${m.cor || 'N/A'} | Spec: ${m.especificacao_tecnica || 'N/A'}</small>
    </li>
  `).join('');
};

// Vincula o evento de 'submit' do formulário à função de cadastro
const form = document.getElementById('form-material');
form?.addEventListener('submit', cadastrarMaterial);

// Chama a renderização inicial ao carregar a página
renderizarTela();