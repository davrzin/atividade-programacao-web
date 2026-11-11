function ehPrimo(n) {
  if (typeof n !== "number" || n < 2 || n % 1 !== 0) {
    return false;
  }

  for (var divisor = 2; divisor * divisor <= n; divisor++) {
    if (n % divisor === 0) {
      return false;
    }
  }

  return true;
}

var primos = [];
for (var numero = 1; numero <= 100; numero++) {
  if (ehPrimo(numero)) {
    primos.push(numero);
    console.log(numero);
  }
}

document.getElementById("resultado").textContent = primos.join(", ");
