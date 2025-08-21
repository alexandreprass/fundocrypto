import { useEffect, useState } from "react";
import Chart from "chart.js/auto";

export default function Home() {
  const [moedas, setMoedas] = useState([]);
  const INVESTMENTO_INICIAL = 100; // Editable initial investment value in USD

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

  // Filtra apenas moedas com quantidade > 0
  const topCrypto = moedas.filter((m) => m.categoria === "top_crypto" && m.quantidade > 0);
  const memecoins = moedas.filter((m) => m.categoria === "memecoin" && m.quantidade > 0);

  // Calculate total portfolio value
  const valorHoje = moedas
    .reduce((acc, m) => acc + m.preco_atual_usd * m.quantidade, 0)
    .toFixed(2);
  const resultadoTotal = (valorHoje - INVESTMENTO_INICIAL).toFixed(2);
  const aSerDistribuido = resultadoTotal > 0 ? (resultadoTotal * 0.5).toFixed(2) : "0.00";

  const styles = {
    root: {
      fontFamily: "'Montserrat', sans-serif",
      backgroundColor: "#0f172a",
      color: "#e2e8f0",
      padding: "20px 10px",
      minHeight: "100vh",
      boxSizing: "border-box",
    },
    container: {
      maxWidth: "1100px",
      margin: "0 auto",
      padding: "0 10px",
    },
    headerH1: {
      fontSize: "clamp(2em, 8vw, 2.5em)",
      fontWeight: 700,
      backgroundImage: "linear-gradient(45deg, #06b6d4, #3b82f6)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      marginBottom: "10px",
      textAlign: "center",
    },
    headerP: {
      fontSize: "clamp(1em, 4vw, 1.1em)",
      color: "#93c5fd",
      textAlign: "center",
    },
    card: {
      backgroundColor: "#1e293b",
      borderRadius: "12px",
      padding: "20px",
      boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
      marginBottom: "20px",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginTop: "15px",
      overflowX: "auto",
      display: "block",
    },
    th: {
      textAlign: "left",
      padding: "10px",
      borderBottom: "1px solid #334155",
      backgroundColor: "#0f172a",
      color: "#06b6d4",
      textTransform: "uppercase",
      fontSize: "clamp(0.8em, 3vw, 0.9em)",
    },
    td: {
      padding: "10px",
      borderBottom: "1px solid #334155",
      fontSize: "clamp(0.8em, 3vw, 0.9em)",
    },
    chartContainer: {
      width: "clamp(200px, 60vw, 250px)",
      height: "clamp(200px, 60vw, 250px)",
      margin: "20px auto",
    },
    disclaimer: {
      fontSize: "clamp(0.8em, 3vw, 0.9em)",
      color: "#94a3b8",
      fontStyle: "italic",
      textAlign: "center",
      marginTop: "20px",
    },
    btn: {
      background: "linear-gradient(45deg, #06b6d4, #3b82f6)",
      color: "#0f172a",
      fontWeight: "bold",
      padding: "12px 24px",
      border: "none",
      borderRadius: "50px",
      cursor: "pointer",
      textDecoration: "none",
      display: "inline-block",
      marginTop: "30px",
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
      fontSize: "clamp(0.9em, 4vw, 1em)",
    },
    btnHover: {
      transform: "scale(1.05)",
      boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
    },
    resultsTable: {
      width: "100%",
      borderCollapse: "collapse",
      marginTop: "15px",
      overflowX: "auto",
      display: "block",
    },
  };

  // Inline styles for mobile responsiveness using media queries
  const mobileStyles = `
    @media (max-width: 768px) {
      .main-content {
        grid-template-columns: 1fr !important;
        gap: 15px !important;
      }
      .card {
        padding: 15px !important;
      }
      .table {
        font-size: 0.8em !important;
      }
      .th, .td {
        padding: 8px !important;
      }
      .chartContainer {
        width: 80vw !important;
        height: 80vw !important;
      }
      .btn {
        padding: 10px 20px !important;
        font-size: 0.9em !important;
      }
    }
  `;

  return (
    <>
      <style>{mobileStyles}</style>
      <div style={styles.root}>
        <div style={styles.container}>
          <header style={{ textAlign: "center", marginBottom: "30px" }}>
            <h1 style={styles.headerH1}>HODL - Fundo Cripto 🚀</h1>
            <p style={styles.headerP}>Alocação estratégica de portfólio para o mercado de criptomoedas.</p>
          </header>

          <div className="main-content" style={{ display: "grid", gridTemplateColumns: "1fr", gap: "20px" }}>
            <div style={{ ...styles.card, gridColumn: "1 / -1", textAlign: "center" }}>
              <h2 style={{ color: "#06b6d4", fontSize: "clamp(1.2em, 5vw, 1.5em)" }}>Distribuição do Portfólio</h2>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={styles.chartContainer} className="chartContainer">
                  <canvas id="portfolioChart"></canvas>
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, textAlign: "left", marginLeft: "20px" }}>
                  <li style={{ position: "relative", paddingLeft: "25px", marginBottom: "8px", fontSize: "clamp(0.8em, 3vw, 0.9em)" }}>
                    <span style={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)", width: "15px", height: "15px", borderRadius: "3px", backgroundColor: "#4CAF50" }}></span>
                    70% - Maiores Criptomoedas do Mercado
                  </li>
                  <li style={{ position: "relative", paddingLeft: "25px", marginBottom: "8px", fontSize: "clamp(0.8em, 3vw, 0.9em)" }}>
                    <span style={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)", width: "15px", height: "15px", borderRadius: "3px", backgroundColor: "#FFC107" }}></span>
                    20% - Maiores Memecoins do Mercado
                  </li>
                  <li style={{ position: "relative", paddingLeft: "25px", marginBottom: "8px", fontSize: "clamp(0.8em, 3vw, 0.9em)" }}>
                    <span style={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)", width: "15px", height: "15px", borderRadius: "3px", backgroundColor: "#E91E63" }}></span>
                    10% - Criptomoedas Novas / Comunidade
                  </li>
                </ul>
              </div>
            </div>

            <div style={styles.card}>
              <h2 style={{ fontSize: "clamp(1.2em, 5vw, 1.5em)" }}>🏆 Top Criptomoedas (70% Alocação)</h2>
              <div style={{ overflowX: "auto" }}>
                <table style={styles.table} className="table">
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
                          <td style={styles.td}>
                            <span style={{ color: "#ffffff" }}>💲 {m.preco_atual_usd.toFixed(4)}</span> |{" "}
                            <span style={{ color: "#000000" }}>Qtde: {m.quantidade}</span> |{" "}
                            <span style={{ color: "#4CAF50" }}>Total: 💲{total}</span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div style={styles.card}>
              <h2 style={{ fontSize: "clamp(1.2em, 5vw, 1.5em)" }}>🐶 Maiores Memecoins (20% Alocação)</h2>
              <div style={{ overflowX: "auto" }}>
                <table style={styles.table} className="table">
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
                          <td style={styles.td}>
                            <span style={{ color: "#ffffff" }}>💲 {m.preco_atual_usd.toFixed(8)}</span> |{" "}
                            <span style={{ color: "#000000" }}>Qtde: {m.quantidade}</span> |{" "}
                            <span style={{ color: "#4CAF50" }}>Total: 💲{total}</span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div style={{ ...styles.card, gridColumn: "1 / -1" }}>
              <h2 style={{ color: "#06b6d4", fontSize: "clamp(1.2em, 5vw, 1.5em)" }}>Resumo Mensal</h2>
              <div style={{ overflowX: "auto" }}>
                <table style={styles.resultsTable} className="table">
                  <thead>
                    <tr>
                      <th style={styles.th}>Investimento</th>
                      <th style={styles.th}>Valor Hoje</th>
                      <th style={styles.th}>Resultado Total</th>
                      <th style={styles.th}>A Ser Distribuído</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={styles.td}>
                        <span style={{ color: "#ff0000" }}>💲{INVESTMENTO_INICIAL.toFixed(2)}</span>
                      </td>
                      <td style={styles.td}>
                        <span>💲{valorHoje}</span>
                      </td>
                      <td style={styles.td}>
                        <span style={{ color: resultadoTotal >= 0 ? "#4CAF50" : "#ff0000" }}>
                          💲{resultadoTotal}
                        </span>
                      </td>
                      <td style={styles.td}>
                        <span style={{ color: "#4CAF50" }}>💲{aSerDistribuido}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <p style={styles.disclaimer}>
            *Obs: 10% do portfólio será alocado em criptomoedas novas, com risco maior, sugeridas e votadas pela comunidade do fundo.
          </p>

          <a
            href="https://gmgn.ai/sol/address/FhJz4WazwT7jdhbb1cePiTMZBoKPHyCtYyX2rPr96qwV"
            target="_blank"
            style={styles.btn}
            onMouseOver={(e) => (e.currentTarget.style = { ...styles.btn, ...styles.btnHover })}
            onMouseOut={(e) => (e.currentTarget.style = styles.btn)}
            className="btn"
          >
            VERIFICAR ALOCAÇÃO EM TEMPO REAL
          </a>

          <footer style={{ marginTop: "30px", textAlign: "center", fontSize: "clamp(0.75em, 3vw, 0.85em)", color: "#64748b" }}>
            &copy; 2025 HODL. Todos os direitos reservados.
          </footer>
        </div>
      </div>
    </>
  );
}
