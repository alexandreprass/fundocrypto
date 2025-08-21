import { useEffect, useState } from "react";
import Chart from "chart.js/auto";

export default function Home() {
  const [moedas, setMoedas] = useState([]);

  useEffect(() => {
    async function carregarDados() {
      try {
        const res = await fetch("/api/get-prices");
        const data = await res.json();

        // Filtra apenas moedas com quantidade >= 0.000001
        const filtradas = data.filter((m) => m.quantidade >= 0.000001);

        setMoedas(filtradas);
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
      }
    }

    carregarDados();
  }, []);

  useEffect(() => {
    const ctx = document.getElementById("portfolioChart");
    if (!ctx) return;

    new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["Top Criptomoedas", "Memecoins", "Criptos Novas/Comunidade"],
        datasets: [
          {
            data: [70, 20, 10],
            backgroundColor: ["#4CAF50", "#FFC107", "#E91E63"],
            borderColor: ["#1e293b", "#1e293b", "#1e293b"],
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "rgba(30, 41, 59, 0.9)",
            titleColor: "#e2e8f0",
            bodyColor: "#e2e8f0",
          },
        },
        elements: { arc: { hoverOffset: 10 } },
      },
    });
  }, []);

  const topCrypto = moedas.filter((m) => m.categoria === "top_crypto");
  const memecoins = moedas.filter((m) => m.categoria === "memecoin");

  // Mantive seu estilo original
  const styles = { /* seu objeto styles aqui */ };

  return (
    <div style={styles.root}>
      <div style={styles.container}>
        {/* Header e gráfico */}
        <header style={{ textAlign: "center", marginBottom: "40px" }}>
          <h1 style={styles.headerH1}>HODL - Fundo Cripto 🚀</h1>
          <p style={styles.headerP}>Alocação estratégica de portfólio para o mercado de criptomoedas.</p>
        </header>

        <div className="main-content" style={{ display: "grid", gap: "30px" }}>
          {/* Pie chart */}
          <div style={{ ...styles.card, gridColumn: "1 / -1", textAlign: "center" }}>
            <h2 style={{ color: "#06b6d4" }}>Distribuição do Portfólio</h2>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={styles.chartContainer}>
                <canvas id="portfolioChart"></canvas>
              </div>
              {/* Legend */}
              <ul style={{ listStyle: "none", padding: 0, margin: 0, textAlign: "left", marginLeft: "20px" }}>
                <li style={{ position: "relative", paddingLeft: "25px", marginBottom: "8px" }}>
                  <span style={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)", width: "15px", height: "15px", borderRadius: "3px", backgroundColor: "#4CAF50" }}></span>
                  70% - Maiores Criptomoedas do Mercado
                </li>
                <li style={{ position: "relative", paddingLeft: "25px", marginBottom: "8px" }}>
                  <span style={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)", width: "15px", height: "15px", borderRadius: "3px", backgroundColor: "#FFC107" }}></span>
                  20% - Maiores Memecoins do Mercado
                </li>
                <li style={{ position: "relative", paddingLeft: "25px", marginBottom: "8px" }}>
                  <span style={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)", width: "15px", height: "15px", borderRadius: "3px", backgroundColor: "#E91E63" }}></span>
                  10% - Criptomoedas Novas / Comunidade
                </li>
              </ul>
            </div>
          </div>

          {/* Tabela Top Crypto */}
          <div style={styles.card}>
            <h2>🏆 Top Criptomoedas (70% Alocação)</h2>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>#</th>
                  <th style={styles.th}>Criptomoeda</th>
                  <th style={styles.th}>Dados</th>
                </tr>
              </thead>
              <tbody>
                {topCrypto.map((m, i) => {
                  const total = (m.preco_atual_usd * m.quantidade).toFixed(2);
                  return (
                    <tr key={m.id}>
                      <td style={styles.td}>{i + 1}</td>
                      <td style={styles.td}>{m.nome} ({m.simbolo})</td>
                      <td style={styles.td}>💲 {m.preco_atual_usd.toFixed(4)} | Qtde: {m.quantidade} | Total: 💲{total}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Tabela Memecoins */}
          <div style={styles.card}>
            <h2>🐶 Maiores Memecoins (20% Alocação)</h2>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>#</th>
                  <th style={styles.th}>Memecoin</th>
                  <th style={styles.th}>Dados</th>
                </tr>
              </thead>
              <tbody>
                {memecoins.map((m, i) => {
                  const total = (m.preco_atual_usd * m.quantidade).toFixed(2);
                  return (
                    <tr key={m.id}>
                      <td style={styles.td}>{i + 1}</td>
                      <td style={styles.td}>{m.nome} ({m.simbolo})</td>
                      <td style={styles.td}>💲 {m.preco_atual_usd.toFixed(8)} | Qtde: {m.quantidade} | Total: 💲{total}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <p style={styles.disclaimer}>
          *Obs: 10% do portfólio será alocado em criptomoedas novas, com risco maior, sugeridas e votadas pela comunidade do fundo.
        </p>

        <a href="https://gmgn.ai/sol/address/FhJz4WazwT7jdhbb1cePiTMZBoKPHyCtYyX2rPr96qwV" target="_blank" style={styles.btn}>
          VERIFICAR ALOCAÇÃO EM TEMPO REAL
        </a>

        <footer style={{ marginTop: "50px", textAlign: "center", fontSize: "0.85em", color: "#64748b" }}>
          &copy; 2025 HODL. Todos os direitos reservados.
        </footer>
      </div>
    </div>
  );
}
