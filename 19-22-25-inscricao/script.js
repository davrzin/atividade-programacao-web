var formulario = document.getElementById("inscricao");
var nome = document.getElementById("nome");
var email = document.getElementById("email");
var nascimento = document.getElementById("nascimento");
var termos = document.getElementById("termos");
var sucesso = document.getElementById("sucesso");
var camposValidados = [nome, email, nascimento, termos];
var mensagens = {
  nome: "Informe um nome com pelo menos 3 caracteres.",
  email: "Informe um e-mail válido.",
  nascimento: "Informe uma data de nascimento válida.",
  termos: "Aceite os termos para continuar."
};

function validarNome() {
  var nomeCurto = nome.value.trim().length < 3;
  nome.setCustomValidity(nomeCurto ? mensagens.nome : "");
}

function mostrarErro(campo) {
  var valido = campo.validity.valid;
  var erro = document.getElementById("erro-" + campo.id);
  erro.textContent = valido ? "" : mensagens[campo.id];

  if (valido) {
    campo.removeAttribute("aria-invalid");
  } else {
    campo.setAttribute("aria-invalid", "true");
  }

  return valido;
}

formulario.addEventListener("input", function (evento) {
  var campo = evento.target;
  sucesso.textContent = "";

  if (campo === nome) {
    validarNome();
  }

  campo.classList.add("editado");
  if (campo.hasAttribute("aria-invalid")) {
    mostrarErro(campo);
  }
});

formulario.addEventListener("submit", function (evento) {
  // A inscrição de exemplo acontece na própria página.
  evento.preventDefault();
  validarNome();

  var primeiroInvalido = null;
  for (var i = 0; i < camposValidados.length; i++) {
    var campo = camposValidados[i];
    var valido = mostrarErro(campo);
    if (!valido && primeiroInvalido === null) {
      primeiroInvalido = campo;
    }
  }

  if (primeiroInvalido !== null) {
    sucesso.textContent = "";
    primeiroInvalido.focus();
    return;
  }

  sucesso.textContent = "Inscrição realizada com sucesso!";
});
