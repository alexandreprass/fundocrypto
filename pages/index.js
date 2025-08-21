import { useEffect, useState } from "react";

export default function Home() {
  const [moedas, setMoedas] = useState([]);

  useEffect(() => {
    async function carregarDados() {
      try {
        const res = await fetch("/api/get-prices");
        const data = await res.json();
        setMoedas(data);
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
      }
    }

    carregarDados();
  }, []);

  useEffect(() => {
    const ctx = document.getElementById("portfolioChart");
    if (!ctx) return;

    import("chart.js/auto").then((Chart) => {
      new Chart.default(ctx, {
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
    });
  }, []);

  const topCrypto = moedas.filter((m) => m.categoria === "top_crypto" && m.quantidade >= 0.000001);
  const memecoins = moedas.filter((m) => m.categoria === "memecoin" && m.quantidade >= 0.000001);

  return (
    <div className="container">
      <header>
        <h1>HODL - Fundo Cripto 🚀</h1>
        <p>Alocação estratégica de portfólio para o mercado de criptomoedas.</p>
      </header>

      <div className="main-content">
        <div className="card pie-chart-section full-width">
          <h2>Distribuição do Portfólio</h2>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div className="chart-container">
              <canvas id="portfolioChart"></canvas>
            </div>
            <ul className="chart-legend">
              <li className="legend-top-crypto">70% - Maiores Criptomoedas do Mercado</li>
              <li className="legend-memecoin">20% - Maiores Memecoins do Mercado</li>
              <li className="legend-new-crypto">10% - Criptomoedas Novas / Comunidade</li>
            </ul>
          </div>
        </div>

        <div className="card">
          <h2>🏆 Top Criptomoedas (70% Alocação)</h2>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Criptomoeda</th>
                <th>Dados</th>
              </tr>
            </thead>
            <tbody>
              {topCrypto.map((m, i) => {
                const total = (m.preco_atual_usd * m.quantidade).toFixed(2);
                return (
                  <tr key={m.id}>
                    <td>{i + 1}</td>
                    <td>{m.nome} ({m.simbolo})</td>
                    <td>💲 {m.preco_atual_usd.toFixed(4)} | Qtde: {m.quantidade} | Total: 💲{total}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="card">
          <h2>🐶 Maiores Memecoins (20% Alocação)</h2>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Memecoin</th>
                <th>Dados</th>
              </tr>
            </thead>
            <tbody>
              {memecoins.map((m, i) => {
                const total = (m.preco_atual_usd * m.quantidade).toFixed(2);
                return (
                  <tr key={m.id}>
                    <td>{i + 1}</td>
                    <td>{m.nome} ({m.simbolo})</td>
                    <td>💲 {m.preco_atual_usd.toFixed(8)} | Qtde: {m.quantidade} | Total: 💲{total}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <p className="disclaimer">
        *Obs: 10% do portfólio será alocado em criptomoedas novas, com risco maior, sugeridas e votadas pela comunidade do fundo.
      </p>

      <a href="https://gmgn.ai/sol/address/FhJz4WazwT7jdhbb1cePiTMZBoKPHyCtYyX2rPr96qwV" target="_blank" className="btn">
        VERIFICAR ALOCAÇÃO EM TEMPO REAL
      </a>

      <footer className="footer">
        &copy; 2025 HODL. Todos os direitos reservados.
      </footer>
    </div>
  );
}
