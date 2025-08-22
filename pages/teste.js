import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Teste() {
  const [moedas, setMoedas] = useState();
  const INVESTMENTO_INICIAL = 100;

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
  },);

  // Dados de exemplo para o gráfico de linha.
  // Você precisará de uma fonte de dados histórica para preencher isso.
  const performanceData =;

  const topCrypto = moedas.filter((m) => m.categoria === "top_crypto" && m.quantidade > 0);
  const memecoins = moedas.filter((m) => m.categoria === "memecoin" && m.quantidade > 0);
  const valorHoje = moedas
  .reduce((acc, m) => acc + m.preco_atual_usd * m.quantidade, 0)
  .toFixed(2);
  const resultadoTotal = (valorHoje - INVESTMENTO_INICIAL).toFixed(2);
  const aSerDistribuido = resultadoTotal > 0? (resultadoTotal * 0.5).toFixed(2) : "0.00";

  const styles = {
    root: {
      fontFamily: "'Montserrat', sans-serif",
      backgroundColor: "#0f172a",
      color: "#e2e8f0",
      padding: "clamp(15px, 5vw, 20px)",
      minHeight: "100vh",
      boxSizing: "border-box",
      textAlign: "center",
    },
    container: {
      maxWidth: "min(1100px, 90vw)",
      margin: "0 auto",
      padding: "0 clamp(5px, 2vw, 10px)",
    },
    headerH1: {
      fontSize: "clamp(2em, 7vw, 2.5em)",
      fontWeight: 700,
      backgroundImage: "linear-gradient(45deg, #06b6d4, #3b82f6)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      marginBottom: "10px",
    },
    headerP: {
      fontSize: "clamp(0.9em, 4vw, 1.1em)",
      color: "#93c5fd",
    },
    card: {
      backgroundColor: "#1e293b",
      borderRadius: "12px",
      padding: "clamp(15px, 4vw, 20px)",
      boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
      marginBottom: "clamp(15px, 4vw, 20px)",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      textAlign: "center",
    },
    tableContainer: {
      overflowX: "auto",
      margin: "0 auto",
      width: "90%",
      maxWidth: "100%",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginTop: "clamp(10px, 3vw, 15px)",
    },
    th: {
      textAlign: "center",
      padding: "clamp(8px, 2vw, 10px)",
      borderBottom: "1px solid #334155",
      backgroundColor: "#0f172a",
      color: "#06b6d4",
      textTransform: "uppercase",
      fontSize: "clamp(0.75em, 2.5vw, 0.85em)",
    },
    td: {
      textAlign: "center",
      padding: "clamp(8px, 2vw, 10px)",
      borderBottom: "1px solid #334155",
      fontSize: "clamp(0.75em, 2.5vw, 0.85em)",
    },
    chartContainer: {
      width: "clamp(180px, 80vw, 600px)",
      height: "clamp(180px, 40vw, 300px)",
      margin: "clamp(15px, 4vw, 20px) auto",
    },
    disclaimer: {
      fontSize: "clamp(0.75em, 2.5vw, 0.85em)",
      color: "#94a3b8",
      fontStyle: "italic",
      marginTop: "clamp(15px, 4vw, 20px)",
    },
    btn: {
      background: "linear-gradient(45deg, #06b6d4, #3b82f6)",
      color: "#0f172a",
      fontWeight: "bold",
      padding: "clamp(10px, 3vw, 12px) clamp(20px, 5vw, 24px)",
      border: "none",
      borderRadius: "50px",
      cursor: "pointer",
      textDecoration: "none",
      display: "block",
      margin: "clamp(20px, 5vw, 30px) auto",
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
      fontSize: "clamp(0.85em, 3vw, 0.95em)",
    },
    btnHover: {
      transform: "scale(1.05)",
      boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
    },
    resultsTable: {
      width: "100%",
      borderCollapse: "collapse",
      marginTop: "clamp(10px, 3vw, 15px)",
    },
  };

  const mobileStyles = `
    @media (max-width: 768px) {
    .main-content {
        grid-template-columns: 1fr!important;
        gap: clamp(10px, 3vw, 15px)!important;
      }
    .card {
        padding: clamp(10px, 3vw, 15px)!important;
      }
    .table,.resultsTable {
        font-size: clamp(0.7em, 2.2vw, 0.8em)!important;
      }
    .th,.td {
        padding: clamp(6px, 1.5vw, 8px)!important;
      }
    .chartContainer {
        width: 90vw!important;
        height: 50vw!important;
      }
    .container {
        width: 90vw!important;
      }
    .btn {
        padding: clamp(8px, 2.5vw, 10px) clamp(15px, 4vw, 20px)!important;
        font-size: clamp(0.8em, 2.5vw, 0.9em)!important;
      }
    }
  `;

  return (
    <>
      <style>{mobileStyles}</style>
      <div style={styles.root}>
        <div style={styles.container} className="container">
          <header style={{ marginBottom: "clamp(20px, 5vw, 30px)" }}>
            <h1 style={styles.headerH1}>HODL - Fundo Cripto 🚀</h1>
            <p style={styles.headerP}>Alocação estratégica de portfólio para o mercado de criptomoedas.</p>
          </header>

          <div className="main-content" style={{ display: "grid", gridTemplateColumns: "1fr", gap: "clamp(15px, 4vw, 20px)" }}>
            <div style={{...styles.card, gridColumn: "1 / -1" }}>
              <h2 style={{ color: "#06b6d4", fontSize: "clamp(1.1em, 4vw, 1.4em)" }}>Desempenho do Portfólio</h2>
              <div style={styles.chartContainer} className="chartContainer">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="name" stroke="#93c5fd" />
                    <YAxis stroke="#93c5fd" />
                    <Tooltip 
                      formatter={(value) => `💲 ${value.toFixed(2)}`} 
                      contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                      labelStyle={{ color: '#e2e8f0' }}
                    />
                    <Line type="monotone" dataKey="valor" stroke="#06b6d4" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div style={styles.card}>
              <h2 style={{ fontSize: "clamp(1.1em, 4vw, 1.4em)" }}>🏆 Top Criptomoedas (70% Alocação)</h2>
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
                        <td style={styles.td}>
                          <span style={{ color: "#ffffff" }}>💲 {m.preco_atual_usd.toFixed(4)}</span> | 
                          <span style={{ color: "#d1d5db" }}>Qtde: {m.quantidade}</span> | 
                          <span style={{ color: "#4CAF50" }}>Total: 💲{total}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div style={styles.card}>
              <h2 style={{ fontSize: "clamp(1.1em, 4vw, 1.4em)" }}>🐶 Maiores Memecoins (20% Alocação)</h2>
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
                        <td style={styles.td}>
                          <span style={{ color: "#ffffff" }}>💲 {m.preco_atual_usd.toFixed(8)}</span> | 
                          <span style={{ color: "#d1d5db" }}>Qtde: {m.quantidade}</span> | 
                          <span style={{ color: "#4CAF50" }}>Total: 💲{total}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div style={{...styles.card, gridColumn: "1 / -1" }}>
              <h2 style={{ color: "#06b6d4", fontSize: "clamp(1.1em, 4vw, 1.4em)" }}>Resumo Mensal</h2>
              <table style={styles.resultsTable}>
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
                      <span style={{ color: "#ff0000" }}>💲{INVESTIMENTO_INICIAL.toFixed(2)}</span>
                    </td>
                    <td style={styles.td}>
                      <span>💲{valorHoje}</span>
                    </td>
                    <td style={styles.td}>
                      <span style={{ color: resultadoTotal >= 0? "#4CAF50" : "#ff0000" }}>
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

          <p style={styles.disclaimer}>
            *Obs: 10% do portfólio será alocado em criptomoedas novas, com risco maior, sugeridas e votadas pela comunidade do fundo.
          </p>

          <a
            href="https://gmgn.ai/sol/address/FhJz4WazwT7jdhbb1cePiTMZBoKPHyCtYyX2rPr96qwV"
            target="_blank"
            style={styles.btn}
            onMouseOver={(e) => (e.currentTarget.style = {...styles.btn,...styles.btnHover })}
            onMouseOut={(e) => (e.currentTarget.style = styles.btn)}
            className="btn"
          >
            VERIFICAR ALOCAÇÃO EM TEMPO REAL
          </a>

          <footer style={{ marginTop: "clamp(20px, 5vw, 30px)", fontSize: "clamp(0.7em, 2.5vw, 0.8em)", color: "#64748b" }}>
            &copy; 2025 HODL. Todos os direitos reservados.
          </footer>
        </div>
      </div>
    </>
  );
}
