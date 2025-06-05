// Dados reais medidos (ajustados para não ultrapassar 3m)
const dados = [0.5, 0.9, 1.4, 2.0, 2.5, 2.8, 3.0, 2.9, 2.6, 2.2];
const dias = Array.from({ length: 10 }, (_, i) => i + 1);

// Funções ajustadas para não ultrapassar 3m
function funcao1(x) {
    // Polinômio ajustado para os dados acima
    return -0.0210 * x ** 3 + 0.251 * x ** 2 - 0.402 * x + 0.6222;
}

function funcao2(x) {
    // Outro polinômio de 3º grau, levemente diferente para comparação
    return -0.015 * x ** 3 + 0.23 * x ** 2 - 0.28 * x + 0.7;
}

function calcularValores(funcao, dias) {
    return dias.map(funcao);
}

const valoresFuncao1 = calcularValores(funcao1, dias);
const valoresFuncao2 = calcularValores(funcao2, dias);

// Análise (opcional)
function encontrarMaximo(dados) {
    const max = Math.max(...dados);
    const dia = dados.indexOf(max) + 1;
    return { max, dia };
}

const { max, dia } = encontrarMaximo(dados);

// Função para criar gráfico
function criarGrafico(id, label, data, color) {
    const ctx = document.getElementById(id).getContext('2d');
    const maxFunc = Math.max(...data);
    const minFunc = Math.min(...data);

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: dias.map(d => `Dia ${d}`),
            datasets: [{
                label: label,
                data: data,
                borderColor: color,
                fill: false,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: label,
                    font: {
                        size: 16
                    }
                },
                legend: {
                    position: 'bottom'
                },
                annotation: {
                    annotations: {
                        limite: {
                            type: 'line',
                            yMin: 2,
                            yMax: 2,
                            borderColor: 'red',
                            borderWidth: 2,
                            borderDash: [6, 6],
                            label: {
                                enabled: true,
                                content: 'Limite 3m',
                                position: 'end',
                                backgroundColor: 'rgba(255,0,0,0.1)',
                                color: 'black'
                            }
                        },
                        minimo: {
                            type: 'line',
                            yMin: minFunc,
                            yMax: minFunc,
                            borderColor: 'blue',
                            borderWidth: 2,
                            borderDash: [4, 4],
                            label: {
                                enabled: true,
                                content: `Mínimo: ${minFunc.toFixed(2)}m`,
                                position: 'start',
                                backgroundColor: 'rgba(0,0,255,0.1)',
                                color: 'blue'
                            }
                        },
                        maximo: {
                            type: 'line',
                            yMin: maxFunc,
                            yMax: maxFunc,
                            borderColor: 'blue',
                            borderWidth: 2,
                            borderDash: [4, 4],
                            label: {
                                enabled: true,
                                content: `Máximo: ${maxFunc.toFixed(2)}m`,
                                position: 'start',
                                backgroundColor: 'rgba(0,0,255,0.1)',
                                color: 'blue'
                            }
                        }
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Dias'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Nível do Rio (m)'
                    },
                    beginAtZero: true,
                    max: 3
                }
            }
        }
    });
}

// Criar os gráficos presentes no HTML
criarGrafico('graficoFuncao1', 'Função Aproximada 1', valoresFuncao1, 'green');
// criarGrafico('graficoFuncao2', 'Função Aproximada 2', valoresFuncao2, 'orange');
