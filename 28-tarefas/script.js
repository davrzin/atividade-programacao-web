const formulario = document.getElementById("form-tarefa");
const campoTarefa = document.getElementById("nova-tarefa");
const erroTarefa = document.getElementById("erro-tarefa");
const lista = document.getElementById("tarefas");
const contador = document.getElementById("contador-pendentes");
const estadoVazio = document.getElementById("estado-vazio");
const botoesFiltro = document.querySelectorAll("[data-filtro]");
const mensagensVazias = {
  todas: "Adicione sua primeira tarefa.",
  pendentes: "Nenhuma tarefa pendente.",
  concluidas: "Nenhuma tarefa concluída."
};

let filtroAtual = "todas";

const atualizarLista = () => {
  let pendentes = 0;
  let visiveis = 0;

  lista.querySelectorAll(".tarefa").forEach((tarefa) => {
    const concluida = tarefa.querySelector("input").checked;
    if (!concluida) {
      pendentes++;
    }

    const visivel = filtroAtual === "todas"
      || (filtroAtual === "pendentes" && !concluida)
      || (filtroAtual === "concluidas" && concluida);
    tarefa.hidden = !visivel;
    tarefa.classList.toggle("concluida", concluida);

    if (visivel) {
      visiveis++;
    }
  });

  const rotuloContador = pendentes === 1 ? "tarefa pendente" : "tarefas pendentes";
  contador.textContent = `${pendentes} ${rotuloContador}`;
  estadoVazio.textContent = mensagensVazias[filtroAtual];
  estadoVazio.hidden = visiveis > 0;
};

const criarTarefa = (texto) => {
  const item = document.createElement("li");
  item.className = "tarefa";

  const rotulo = document.createElement("label");
  rotulo.className = "descricao-tarefa";

  const caixa = document.createElement("input");
  caixa.type = "checkbox";

  const descricao = document.createElement("span");
  descricao.className = "texto-tarefa";
  descricao.textContent = texto;
  rotulo.append(caixa, descricao);

  const remover = document.createElement("button");
  remover.type = "button";
  remover.className = "botao botao-secundario remover";
  remover.textContent = "Remover";
  remover.setAttribute("aria-label", `Remover tarefa ${texto}`);

  caixa.addEventListener("change", () => {
    atualizarLista();
    if (item.hidden) {
      document.querySelector('[data-filtro][aria-pressed="true"]').focus();
    }
  });

  remover.addEventListener("click", () => {
    item.remove();
    atualizarLista();
    campoTarefa.focus();
  });

  item.append(rotulo, remover);
  lista.append(item);
};

campoTarefa.addEventListener("input", () => {
  erroTarefa.textContent = "";
  campoTarefa.removeAttribute("aria-invalid");
});

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const texto = campoTarefa.value.trim();

  if (texto === "") {
    erroTarefa.textContent = "Digite uma tarefa antes de adicionar.";
    campoTarefa.setAttribute("aria-invalid", "true");
    campoTarefa.focus();
    return;
  }

  criarTarefa(texto);
  formulario.reset();
  erroTarefa.textContent = "";
  campoTarefa.removeAttribute("aria-invalid");
  campoTarefa.focus();
  atualizarLista();
});

botoesFiltro.forEach((botao) => {
  botao.addEventListener("click", () => {
    filtroAtual = botao.dataset.filtro;
    botoesFiltro.forEach((opcao) => {
      opcao.setAttribute("aria-pressed", String(opcao === botao));
    });
    atualizarLista();
  });
});
