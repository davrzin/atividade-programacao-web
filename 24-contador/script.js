var valor = 0;
var numero = document.getElementById("numero");
var aumentar = document.getElementById("aumentar");
var diminuir = document.getElementById("diminuir");
var zerar = document.getElementById("zerar");

function atualizarNumero() {
  numero.textContent = valor;
  numero.classList.toggle("zero", valor === 0);
  numero.classList.toggle("maior-que-dez", valor > 10);
}

aumentar.addEventListener("click", function () {
  valor++;
  atualizarNumero();
});

diminuir.addEventListener("click", function () {
  if (valor > 0) {
    valor--;
    atualizarNumero();
  }
});

zerar.addEventListener("click", function () {
  valor = 0;
  atualizarNumero();
});

atualizarNumero();
