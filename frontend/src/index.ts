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

let idEdicao: number | null = null; 

// Função que BUSCA os dados do backend
export const buscarDados = async (): Promise<Material[]> => {
  try {
    const response = await api.get('/materiais/');
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    return [];
  }
};

// Função para CANCELAR a edição (reseta o formulário e volta ao estado de cadastro)
const cancelarEdicao = () => {
  idEdicao = null; // Reseta o ID
  const formulario = document.getElementById('form-material') as HTMLFormElement;
  if (formulario) formulario.reset(); // Limpa os campos
  resetarInterface(); // Volta o título e botão ao normal
};
(window as any).cancelarEdicao = cancelarEdicao;

//Função de cadastro de um novo material ou edição de um material existente
const salvarMaterial = async (evento: Event) => {
  evento.preventDefault(); 

  // --- SEU CÓDIGO ORIGINAL DE CAPTURA (Mantido) ---
  const nome = (document.getElementById('nome') as HTMLInputElement).value;
  const marca = (document.getElementById('marca') as HTMLInputElement).value;
  const cor = (document.getElementById('cor') as HTMLInputElement).value;
  const espec = (document.getElementById('especificacao_tecnica') as HTMLInputElement).value;
  const quantidade = (document.getElementById('quantidade') as HTMLInputElement).value;
  const unidade = (document.getElementById('unidade') as HTMLInputElement).value;

  const materialDados: Material = {
    nome: nome,
    marca: marca,
    cor: cor,
    especificacao_tecnica: espec,
    quantidade_estoque: parseInt(quantidade),
    unidade_medida: unidade,
  };
  // -----------------------------------------------

  try {
    if (idEdicao) {
      // Se idEdicao não for null, estamos EDITANDO
      await api.put(`/materiais/${idEdicao}`, materialDados);
      alert("Material atualizado!");
      idEdicao = null; // Reseta para que o próximo clique seja um novo cadastro
    } else {
      // Se idEdicao for null, estamos CADASTRANDO um novo
      await api.post('/materiais/', materialDados);
      alert("Material adicionado ao Volt!");
    }

    (evento.target as HTMLFormElement).reset(); 
    resetarInterface(); // Pequena função auxiliar para voltar o texto do botão ao normal
    renderizarTela(); 
    
  } catch (error) {
    console.error("Erro na operação:", error);
    alert("Erro ao salvar. Verifique se o backend está rodando.");
  }
};


const excluirMaterial = async (id: number) => {
  const confirmar = confirm("Tem certeza que deseja excluir este material do estoque?"); // Confirmação antes de excluir para evitar cliques acidentais
  
  if (confirmar) {
    try {
      await api.delete(`/materiais/${id}`);
      
      alert("Material removido com sucesso!");
      
      renderizarTela(); // Atualiza a lista após exclusão para nao mostrar o item excluído
    } catch (error) {
      console.error("Erro ao excluir:", error);
      alert("Não foi possível excluir o material.");
    }
  }
};
(window as any).excluirMaterial = excluirMaterial;

const prepararEdicao = (material: Material) => {
  idEdicao = material.id!; // Salva o ID na nossa variável global de controle
  
  // Preenche os campos do HTML com os valores atuais do material
  (document.getElementById('nome') as HTMLInputElement).value = material.nome;
  (document.getElementById('marca') as HTMLInputElement).value = material.marca || '';
  (document.getElementById('cor') as HTMLInputElement).value = material.cor || '';
  (document.getElementById('especificacao_tecnica') as HTMLInputElement).value = material.especificacao_tecnica || '';
  (document.getElementById('quantidade') as HTMLInputElement).value = material.quantidade_estoque.toString();
  (document.getElementById('unidade') as HTMLInputElement).value = material.unidade_medida;
  
  const titulo = document.getElementById('titulo-form');
  const botao = document.getElementById('btn-salvar');
  if (titulo) titulo.innerText = "Editando Material";
  if (botao) botao.innerText = "Salvar Alterações";
};

(window as any).editarMaterial = prepararEdicao;

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

  // Renderiza cada material como um item de lista, incluindo os botões de editar e excluir
  listaElemento.innerHTML = materiais.map(m => `
    <li style="margin-bottom: 10px; list-style: none; border-bottom: 1px solid #eee; padding: 10px; display: flex; justify-content: space-between; align-items: center;">
      <div>
        <strong>${m.nome}</strong> - ${m.quantidade_estoque} ${m.unidade_medida} <br>
        <small>Marca: ${m.marca || 'N/A'} | Cor: ${m.cor || 'N/A'} | Spec: ${m.especificacao_tecnica || 'N/A'}</small>
      </div>

      <div>
        <button onclick='window.editarMaterial(${JSON.stringify(m)})'>Editar</button>
        <button onclick="window.excluirMaterial(${m.id})">Excluir</button>
      </div>
    </li>
  `).join('');
};

// Função auxiliar para resetar a interface após cadastro ou edição
const resetarInterface = () => {
  const titulo = document.getElementById('titulo-form');
  const botao = document.getElementById('btn-salvar');
  
  if (titulo) titulo.innerText = "Cadastrar novo material";
  if (botao) botao.innerText = "Cadastrar no Estoque";
};

// Configura o listener do formulário para chamar a função de salvar (tanto para cadastro quanto para edição)
const form = document.getElementById('form-material');
form?.addEventListener('submit', salvarMaterial)

// Chama a renderização inicial ao carregar a página
renderizarTela();