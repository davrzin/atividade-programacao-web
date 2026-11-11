var formulario = document.getElementById("form-imc");
var campoPeso = document.getElementById("peso");
var campoAltura = document.getElementById("altura");
var erro = document.getElementById("erro");
var resultado = document.getElementById("resultado");

function lerMedida(campo) {
  var texto = campo.value.trim();
  if (!/^\d*[.,]?\d+$/.test(texto)) {
    return NaN;
  }
  return Number(texto.replace(",", "."));
}

function classificarIMC(imc) {
  if (imc < 18.5) {
    return "Abaixo do peso";
  }
  if (imc < 25) {
    return "Normal";
  }
  if (imc < 30) {
    return "Sobrepeso";
  }
  return "Obesidade";
}

formulario.addEventListener("input", function () {
  erro.textContent = "";
  resultado.textContent = "";
});

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();

  var peso = lerMedida(campoPeso);
  var altura = lerMedida(campoAltura);
  if (!isFinite(peso) || !isFinite(altura) || peso <= 0 || altura <= 0) {
    resultado.textContent = "";
    erro.textContent = "Informe um peso e uma altura válidos, maiores que zero.";
    return;
  }

  var imc = peso / (altura * altura);
  if (!isFinite(imc) || imc <= 0) {
    resultado.textContent = "";
    erro.textContent = "Confira as medidas e tente novamente.";
    return;
  }

  var imcFormatado = imc.toFixed(2).replace(".", ",");
  erro.textContent = "";
  resultado.textContent = "IMC de " + imcFormatado + " · " + classificarIMC(imc);
});
