const produtos = [
  { nome: "Teclado", preco: 150, categoria: "periféricos", estoque: 10 },
  { nome: "Mouse", preco: 80, categoria: "periféricos", estoque: 0 },
  { nome: "Monitor", preco: 900, categoria: "telas", estoque: 4 },
  { nome: "Notebook", preco: 3500, categoria: "computadores", estoque: 2 },
  { nome: "Headset", preco: 220, categoria: "periféricos", estoque: 7 }
];

const emReais = (valor) => valor.toLocaleString("pt-BR", {
  style: "currency",
  currency: "BRL"
});

const nomesMaiusculos = produtos.map((produto) => produto.nome.toUpperCase());
const produtosComEstoque = produtos.filter((produto) => produto.estoque > 0);

const valorTotal = produtos.reduce((total, produto) => {
  return total + produto.preco * produto.estoque;
}, 0);

const produtosPorCategoria = produtos.reduce((grupos, produto) => {
  const categoria = produto.categoria;
  if (!grupos[categoria]) {
    grupos[categoria] = [];
  }
  grupos[categoria].push(produto);
  return grupos;
}, {});

const precosFormatados = produtos.map((produto) => `${produto.nome} – ${emReais(produto.preco)}`);

const adicionarItem = (lista, texto) => {
  const item = document.createElement("li");
  item.textContent = texto;
  lista.append(item);
};

document.getElementById("nomes").textContent = nomesMaiusculos.join(", ");
document.getElementById("valor-total").textContent = emReais(valorTotal);

const listaDisponiveis = document.getElementById("disponiveis");
produtosComEstoque.forEach((produto) => {
  adicionarItem(listaDisponiveis, `${produto.nome} (${produto.estoque} un.)`);
});

const listaCategorias = document.getElementById("categorias");
Object.entries(produtosPorCategoria).forEach(([categoria, itens]) => {
  const titulo = document.createElement("dt");
  const descricao = document.createElement("dd");
  titulo.textContent = categoria;
  descricao.textContent = itens.map((produto) => produto.nome).join(", ");
  listaCategorias.append(titulo, descricao);
});

const listaPrecos = document.getElementById("precos");
precosFormatados.forEach((texto) => {
  adicionarItem(listaPrecos, texto);
  console.log(texto);
});

console.log("Nomes em maiúsculas", nomesMaiusculos);
console.log("Produtos com estoque", produtosComEstoque);
console.log("Valor total em estoque", valorTotal);
console.log("Produtos por categoria", produtosPorCategoria);
