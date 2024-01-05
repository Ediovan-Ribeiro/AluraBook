let livros = [];
const endpontiDaAPI = 'https://guilhermeonrails.github.io/casadocodigo/livros.json';
getBuscarLivrosDaAPI()
const elementoParaInserirLivros = document.getElementById('livros')
const elementoComValorTotalDeLivrosDisponiveis = document.getElementById('valor_total_livros_disponiveis')
async function getBuscarLivrosDaAPI() {
  const res = await fetch(endpontiDaAPI)
  livros = await res.json();
  let livrosComDesconto = aplicarDesconto(livros)
  exibirOslivrosNaTela(livrosComDesconto)

}

function exibirOslivrosNaTela(listaDeLivros) {
  elementoComValorTotalDeLivrosDisponiveis.innerHTML = '';
  elementoParaInserirLivros.innerHTML = ' ';
  listaDeLivros.forEach(livros => {
    let disponibilidade = livros.quantidade > 0 ? 'livro__imagens' : 'livro__imagens indisponivel';
    elementoParaInserirLivros.innerHTML += `<div class="livro">
      <img class="${disponibilidade}" src="${livros.imagem}" alt="${livros.alt}" />
      <h2 class="livro__titulo">
        ${livros.titulo}
      </h2>
      <p class="livro__descricao">${livros.autor}</p>
      <p class="livro__preco" id="preco">R$${livros.preco.toFixed(2)}</p>
      <div class="tags">
        <span class="tag">${livros.categoria}</span>
 
      </div>
    </div>`
  })
}


function aplicarDesconto(livros) {
  const desconto = 0.3
  livrosComDesconto = livros.map(livros => {
    return { ...livros, preco: livros.preco - (livros.preco * desconto) }
  })
  return livrosComDesconto;
}
const botoes = document.querySelectorAll('.btn');
botoes.forEach(btn => btn.addEventListener('click', filtrarLivros));

function filtrarLivros() {
  const elementoBtn = document.getElementById(this.id);
  const categoria = elementoBtn.value
  let livrosFiltrados = categoria == 'disponivel' ? filtrarPorDisponibilidade() : filtrarPorCategoria(categoria);
  exibirOslivrosNaTela(livrosFiltrados);
  if (categoria == 'disponivel') {
    const valorTotal = calcularValorTotalDeLivrosDisponiveis(livrosFiltrados)
    
    exibirValorTotalDosLivrosDisponiveisNaTela(valorTotal)
  }
}
function filtrarPorCategoria(categoria) {
  return livros.filter(livros => livros.categoria == categoria);
}

function filtrarPorDisponibilidade() {
  return livros.filter(livros => livros.quantidade > 0);
}


let btnOrdenarPorPreco = document.getElementById('btnOrdenarPorPreco')
btnOrdenarPorPreco.addEventListener('click', ordernarLivrosPorPreco);
function ordernarLivrosPorPreco() {
  let livrosOrdenados = livros.sort((menor, maior) => menor.preco - maior.preco);
  exibirOslivrosNaTela(livrosOrdenados)
}
function calcularValorTotalDeLivrosDisponiveis(livros) {
  return livros.reduce((acc, livro) => acc + livro.preco, 0).toFixed(2);

}
function exibirValorTotalDosLivrosDisponiveisNaTela(valorTotal) {
  elementoComValorTotalDeLivrosDisponiveis.innerHTML = ` <div class="livros__disponiveis">
  <p>Todos os livros disponíveis por R$ <span id="valor"> ${valorTotal} </span></p>
</div>`
}