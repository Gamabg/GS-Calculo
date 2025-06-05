const ctx = document.getElementById("graficoNiveis").getContext("2d");

// Dias e níveis simulados de um rio em metros
const dias = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const niveis = dias.map((x) => (-0.05 * x ** 3 + 0.63 * x ** 2 - 1.7 * x + 1).toFixed(2));

const risco = niveis.map((n) => (parseFloat(n) > 2 ? "#ff4d4f" : "#0077a8"));

new Chart(ctx, {
    type: "bar",
    data: {
        labels: dias.map((d) => `Dia ${d}`),
        datasets: [
            {
                label: "Nível do Rio (m)",
                data: niveis,
                backgroundColor: risco,
                borderRadius: 8,
                borderSkipped: false,
            },
        ],
    },
    options: {
        responsive: true,
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: (context) => `Nível: ${context.parsed.y} m`,
                },
            },
            title: {
                display: true,
                text: "Evolução do Nível do Rio nos 10 Dias de Chuva",
                font: {
                    size: 18,
                },
                color: "#333",
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: "Altura (m)",
                },
                grid: {
                    color: "#ccc",
                },
                ticks: {
                    stepSize: 0.5,
                },
            },
            x: {
                grid: {
                    display: false,
                },
            },
        },
    },
});

// Funções polinomiais
function funcao1(x) {
    return Math.min(-0.05 * x ** 3 + 0.7 * x ** 2 - 1.5 * x + 1, 3);
}

function funcao2(x) {
    return Math.min(-0.1 * x ** 3 + 0.9 * x ** 2 - 1.2 * x + 0.8, 3);
}

function gerarDados(func) {
    const labels = [], valores = [], cores = [];
    for (let i = 1; i <= 10; i++) {
        const y = func(i);
        labels.push("Dia " + i);
        valores.push(y.toFixed(2));
        cores.push(y > 2 ? "#ff4d4f" : "#0077a8");
    }
    return { labels, valores, cores };
}

function criarGrafico(idCanvas, funcao, titulo) {
    const ctx = document.getElementById(idCanvas).getContext("2d");
    const { labels, valores, cores } = gerarDados(funcao);

    new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Nível do Rio (m)",
                    data: valores,
                    backgroundColor: "rgba(0, 119, 168, 0.2)",
                    borderColor: "#0077a8",
                    borderWidth: 3,
                    pointBackgroundColor: cores,
                    pointBorderColor: "#fff",
                    pointRadius: 6,
                    tension: 0.4,
                    fill: true,
                },
            ],
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: (context) => `Nível: ${context.parsed.y} m`,
                    },
                },
                title: {
                    display: true,
                    text: titulo,
                    font: { size: 20 },
                    color: "#222",
                },
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: "Altura (m)",
                        color: "#333",
                        font: { size: 16 },
                    },
                    grid: {
                        color: "#e0e0e0",
                    },
                    ticks: {
                        stepSize: 0.5,
                        color: "#333",
                    },
                },
                x: {
                    title: {
                        display: true,
                        text: "Dias",
                        color: "#333",
                        font: { size: 16 },
                    },
                    ticks: {
                        color: "#333",
                    },
                    grid: {
                        display: false,
                    },
                },
            },
        },
    });
}

// Criar os dois gráficos com estilo igual ao primeiro
criarGrafico("graficoNiveis", funcao1, "Função 1: Evolução do Nível do Rio nos 10 Dias de Chuva");
criarGrafico("graficoFuncao2", funcao2, "Função 2: Simulação Alternativa de Nível do Rio");
