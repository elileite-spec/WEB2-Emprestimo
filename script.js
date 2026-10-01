// Simulador de Empréstimos — Magno & Eli

const formulario = document.getElementById("loanForm");

const campoValor = document.getElementById("valor");
const campoJuros = document.getElementById("juros");
const campoPrazo = document.getElementById("prazo");

const valorParcela    = document.getElementById("valorParcela");
const valorSolicitado = document.getElementById("valorSolicitado");
const totalJuros      = document.getElementById("totalJuros");
const valorFinal      = document.getElementById("valorFinal");

const barraPrincipal = document.getElementById("barraPrincipal");
const barraJuros     = document.getElementById("barraJuros");
const barraTotal     = document.getElementById("barraTotal");

const mensagemErro = document.getElementById("erro");

function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// Tabela Price: P = V × (i × (1+i)^n) / ((1+i)^n − 1)
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

    return { parcela, total, juros: jurosTotal };
}

function atualizarGrafico(valor, juros, total) {
    const maior = Math.max(valor, juros, total);
    const alturaMax = 140;

    barraPrincipal.style.height = `${(valor / maior) * alturaMax}px`;
    barraJuros.style.height     = `${(juros / maior) * alturaMax}px`;
    barraTotal.style.height     = `${(total / maior) * alturaMax}px`;
}

function realizarCalculo() {
    const valor = Number(campoValor.value);
    const juros = Number(campoJuros.value);
    const prazo = Number(campoPrazo.value);

    if (valor <= 0 || juros < 0 || prazo <= 0 || prazo > 600) {
        mensagemErro.textContent = "Digite valores válidos para a simulação.";
        mensagemErro.hidden = false;
        return;
    }

    mensagemErro.hidden = true;

    const resultado = calcularEmprestimo(valor, juros, prazo);

    valorParcela.textContent    = formatarMoeda(resultado.parcela);
    valorSolicitado.textContent = formatarMoeda(valor);
    totalJuros.textContent      = formatarMoeda(resultado.juros);
    valorFinal.textContent      = formatarMoeda(resultado.total);

    atualizarGrafico(valor, resultado.juros, resultado.total);
}

formulario.addEventListener("submit", function (event) {
    event.preventDefault();
    realizarCalculo();
});
