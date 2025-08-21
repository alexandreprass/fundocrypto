<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>HODL - Fundo Cripto</title>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary-color: #06b6d4;
            --secondary-color: #93c5fd;
            --background-dark: #0f172a;
            --card-background: #1e293b;
            --text-light: #e2e8f0;
            --border-color: #334155;
            --gradient-start: #06b6d4;
            --gradient-end: #3b82f6;
        }

        body {
            font-family: 'Montserrat', sans-serif;
            background-color: var(--background-dark);
            color: var(--text-light);
            margin: 0;
            padding: 40px 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            line-height: 1.6;
            min-height: 100vh;
        }

        .container {
            width: 100%;
            max-width: 1100px;
            padding: 0 20px;
        }

        header {
            text-align: center;
            margin-bottom: 40px;
        }

        header h1 {
            font-size: 3em;
            font-weight: 700;
            color: var(--primary-color);
            margin-bottom: 10px;
            background-image: linear-gradient(45deg, var(--gradient-start), var(--gradient-end));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        header p {
            font-size: 1.2em;
            color: var(--secondary-color);
            margin: 0;
        }

        .main-content {
            display: grid;
            grid-template-columns: 1fr;
            gap: 30px;
        }
        
        @media (min-width: 768px) {
            .main-content {
                grid-template-columns: 1fr 1fr;
            }
            .full-width {
                grid-column: 1 / -1;
            }
        }

        .card {
            background-color: var(--card-background);
            border-radius: 12px;
            padding: 25px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
        }

        .card h2 {
            font-size: 1.5em;
            color: var(--secondary-color);
            border-bottom: 2px solid var(--border-color);
            padding-bottom: 10px;
            margin-top: 0;
            margin-bottom: 20px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }

        th, td {
            padding: 15px;
            text-align: left;
            border-bottom: 1px solid var(--border-color);
        }

        th {
            background-color: var(--background-dark);
            color: var(--primary-color);
            font-weight: 500;
            text-transform: uppercase;
        }

        tr:last-child td {
            border-bottom: none;
        }

        .pie-chart-section {
            text-align: center;
        }

        .pie-chart-section h2 {
            color: var(--primary-color);
            border-bottom: none;
            margin-bottom: 10px;
        }
        
        .chart-container {
            width: 250px;
            height: 250px;
            margin: 20px auto;
            position: relative;
        }

        .chart-legend {
            list-style: none;
            padding: 0;
            margin: 0;
            text-align: left;
            margin-left: 20px;
        }
        
        .chart-legend li {
            font-size: 1em;
            margin-bottom: 8px;
            position: relative;
            padding-left: 25px;
        }

        .chart-legend li::before {
            content: '';
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 15px;
            height: 15px;
            border-radius: 3px;
        }

        .legend-top-crypto::before { background-color: #4CAF50; }
        .legend-memecoin::before { background-color: #FFC107; }
        .legend-new-crypto::before { background-color: #E91E63; }
        
        .disclaimer {
            font-size: 0.9em;
            color: #94a3b8;
            font-style: italic;
            text-align: center;
            margin-top: 30px;
            max-width: 800px;
            margin-left: auto;
            margin-right: auto;
        }

        .btn {
            background: linear-gradient(45deg, var(--gradient-start), var(--gradient-end));
            color: var(--background-dark);
            font-weight: bold;
            padding: 16px 32px;
            border: none;
            border-radius: 50px;
            cursor: pointer;
            text-decoration: none;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            text-transform: uppercase;
            letter-spacing: 1px;
            display: inline-block;
            margin-top: 40px;
        }

        .btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
            background: linear-gradient(45deg, var(--gradient-end), var(--gradient-start));
        }

        .footer {
            margin-top: 50px;
            text-align: center;
            font-size: 0.85em;
            color: #64748b;
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>HODL - Fundo Cripto 🚀</h1>
            <p>Alocação estratégica de portfólio para o mercado de criptomoedas.</p>
        </header>

        <div class="main-content">
            <div class="card pie-chart-section full-width">
                <h2>Distribuição do Portfólio</h2>
                <div style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
                    <div class="chart-container">
                        <canvas id="portfolioChart"></canvas>
                    </div>
                    <ul class="chart-legend">
                        <li class="legend-top-crypto">70% - Maiores Criptomoedas do Mercado</li>
                        <li class="legend-memecoin">20% - Maiores Memecoins do Mercado</li>
                        <li class="legend-new-crypto">10% - Criptomoedas Novas / Comunidade</li>
                    </ul>
                </div>
            </div>

            <div class="card">
                <h2>🏆 Top Criptomoedas (70% Alocação)</h2>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Criptomoeda</th>
                            <th>Dados</th>
                        </tr>
                    </thead>
                    <tbody id="top-crypto-table"></tbody>
                </table>
            </div>

            <div class="card">
                <h2>🐶 Maiores Memecoins (20% Alocação)</h2>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Memecoin</th>
                            <th>Dados</th>
                        </tr>
                    </thead>
                    <tbody id="memecoin-table"></tbody>
                </table>
            </div>
        </div>

        <p class="disclaimer">
            *Obs: 10% do portfólio será alocado em criptomoedas novas, com risco maior, sugeridas e votadas pela comunidade do fundo.
        </p>

        <a href="https://gmgn.ai/sol/address/FhJz4WazwT7jdhbb1cePiTMZBoKPHyCtYyX2rPr96qwV" class="btn" target="_blank">
            VERIFICAR ALOCAÇÃO EM TEMPO REAL
        </a>
    </div>

    <footer class="footer">
        &copy; 2025 HODL. Todos os direitos reservados.
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script>
        const ctx = document.getElementById('portfolioChart').getContext('2d');
        const portfolioChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Top Criptomoedas', 'Memecoins', 'Criptos Novas/Comunidade'],
                datasets: [{
                    data: [70, 20, 10],
                    backgroundColor: [
                        '#4CAF50',
                        '#FFC107',
                        '#E91E63'
                    ],
                    borderColor: [
                        'var(--card-background)',
                        'var(--card-background)',
                        'var(--card-background)'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    tooltip: {
                        enabled: true,
                        backgroundColor: 'rgba(30, 41, 59, 0.9)',
                        titleColor: 'var(--text-light)',
                        bodyColor: 'var(--text-light)',
                        titleFont: {
                            size: 16,
                            weight: 'bold'
                        },
                        bodyFont: {
                            size: 14
                        },
                    },
                    legend: {
                        display: false
                    }
                },
                elements: {
                    arc: {
                        hoverOffset: 10
                    }
                }
            }
        });

        async function carregarDados() {
            try {
                const res = await fetch("/api/get-prices");
                const moedas = await res.json();

                const topCrypto = moedas.filter(m => m.categoria === "top_crypto");
                const memecoins = moedas.filter(m => m.categoria === "memecoin");

                const topTable = document.getElementById("top-crypto-table");
                const memeTable = document.getElementById("memecoin-table");

                topTable.innerHTML = "";
                memeTable.innerHTML = "";

                topCrypto.forEach((m, i) => {
                    const valorTotal = (m.preco_atual_usd * m.quantidade).toFixed(2);
                    topTable.innerHTML += `
                        <tr>
                          <td>${i + 1}</td>
                          <td>${m.nome} (${m.simbolo})</td>
                          <td>💲 ${m.preco_atual_usd.toFixed(4)} | Qtde: ${m.quantidade} | Total: 💲${valorTotal}</td>
                        </tr>
                    `;
                });

                memecoins.forEach((m, i) => {
                    const valorTotal = (m.preco_atual_usd * m.quantidade).toFixed(2);
                    memeTable.innerHTML += `
                        <tr>
                          <td>${i + 1}</td>
                          <td>${m.nome} (${m.simbolo})</td>
                          <td>💲 ${m.preco_atual_usd.toFixed(8)} | Qtde: ${m.quantidade} | Total: 💲${valorTotal}</td>
                        </tr>
                    `;
                });

            } catch (err) {
                console.error("Erro ao carregar dados:", err);
            }
        }

        window.onload = carregarDados;
    </script>
</body>
</html>
