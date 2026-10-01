const formulario = document.getElementById("loanForm");

const valorParcela = document.getElementById("valorParcela");
const valorSolicitado = document.getElementById("valorSolicitado");
const totalJuros = document.getElementById("totalJuros");
const valorFinal = document.getElementById("valorFinal");

const barraPrincipal = document.getElementById("barraPrincipal");
const barraJuros = document.getElementById("barraJuros");
const barraTotal = document.getElementById("barraTotal");

function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function calcularEmprestimo(valor, juros, prazo) {
    const taxa = juros / 100;

    let parcela;

    if (taxa === 0) {
        parcela = valor / prazo;
    } else {
        parcela =
            valor *
            (taxa * Math.pow(1 + taxa, prazo)) /
            (Math.pow(1 + taxa, prazo) - 1);
    }

    const total = parcela * prazo;
    const jurosTotal = total - valor;

    return {
        parcela,
        total,
        juros: jurosTotal
    };
}

function atualizarGrafico(valor, juros, total) {
    const maiorValor = Math.max(valor, juros, total);

    const alturaPrincipal = (valor / maiorValor) * 160;
    const alturaJuros = (juros / maiorValor) * 160;
    const alturaTotal = (total / maiorValor) * 160;

    barraPrincipal.style.height = `${Math.max(alturaPrincipal, 10)}px`;
    barraJuros.style.height = `${Math.max(alturaJuros, 10)}px`;
    barraTotal.style.height = `${Math.max(alturaTotal, 10)}px`;
}

function realizarCalculo() {
    const valor = Number(document.getElementById("valor").value);
    const juros = Number(document.getElementById("juros").value);
    const prazo = Number(document.getElementById("prazo").value);

    if (valor <= 0 || juros < 0 || prazo <= 0) {
        alert("Digite valores válidos para realizar a simulação.");
        return;
    }

    const resultado = calcularEmprestimo(valor, juros, prazo);

    valorParcela.textContent = formatarMoeda(resultado.parcela);
    valorSolicitado.textContent = formatarMoeda(valor);
    totalJuros.textContent = formatarMoeda(resultado.juros);
    valorFinal.textContent = formatarMoeda(resultado.total);

    atualizarGrafico(
        valor,
        resultado.juros,
        resultado.total
    );
}

formulario.addEventListener("submit", function(event) {
    event.preventDefault();
    realizarCalculo();
});

formulario.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        realizarCalculo();
    }
});
