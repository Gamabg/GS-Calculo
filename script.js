// Gráficos de funções
const dados = [0.5, 0.8, 1.2, 1.8, 2.3, 2.6, 2.9, 2.7, 2.4, 2.0];
const dias = Array.from({ length: 10 }, (_, i) => i + 1);

function funcao1(x) {
    return -0.05 * x ** 3 + 0.7 * x ** 2 - 1.5 * x + 1;
}

function funcao2(x) {
    return 0.02 * x ** 3 - 0.3 * x ** 2 + 1.2 * x + 0.5;
}

function calcularValores(funcao, dias) {
    return dias.map(funcao);
}

function identificarDiasDeRisco(dados, limite) {
    return dias.filter((_, i) => dados[i] > limite);
}

function encontrarMaximo(dados) {
    const max = Math.max(...dados);
    const dia = dados.indexOf(max) + 1;
    return { max, dia };
}

const valoresFuncao1 = calcularValores(funcao1, dias);
const valoresFuncao2 = calcularValores(funcao2, dias);

const risco = identificarDiasDeRisco(dados, 2);
const { max, dia } = encontrarMaximo(dados);

document.getElementById('analise').innerHTML = `
  <li>Domínio: dias de 1 a 10</li>
  <li>Imagem: níveis de ${Math.min(...dados)}m a ${max}m</li>
  <li>Ponto máximo: ${max}m no dia ${dia}</li>
  <li>Dias de risco (>2m): ${risco.join(', ')}</li>
`;

function criarGrafico(id, label, data, color) {
    const ctx = document.getElementById(id).getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: dias,
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
                legend: {
                    position: 'bottom'
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
                    beginAtZero: true
                }
            }
        }
    });
}

criarGrafico('graficoFuncao1', 'Função Aproximada 1', valoresFuncao1, 'red');
criarGrafico('graficoFuncao2', 'Função Aproximada 2', valoresFuncao2, 'green');
criarGrafico('graficoReal', 'Nível Real do Rio', dados, 'blue');
