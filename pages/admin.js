import { useEffect, useState } from "react";

export default function Admin() {
  const [moedas, setMoedas] = useState([]);

  useEffect(() => {
    async function carregarMoedas() {
      try {
        const res = await fetch("/api/get-prices");
        const data = await res.json();
        setMoedas(data);
      } catch (err) {
        console.error("Erro ao carregar moedas:", err);
      }
    }

    carregarMoedas();
  }, []);

  const atualizarMoeda = async (id, nome, simbolo, quantidade) => {
    try {
      // Atualiza nome e símbolo
      await fetch("/api/update-nome-simbolo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, nome, simbolo }),
      });

      // Atualiza quantidade
      await fetch("/api/update-quantidade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, quantidade }),
      });

      alert("Moeda atualizada!");
    } catch (err) {
      console.error("Erro ao atualizar moeda:", err);
      alert("Erro ao atualizar moeda.");
    }
  };

  const styles = {
    root: { fontFamily: "'Montserrat', sans-serif", backgroundColor: "#0f172a", color: "#e2e8f0", padding: "40px 20px", minHeight: "100vh" },
    container: { maxWidth: "1100px", margin: "0 auto" },
    headerH1: { fontSize: "2.5em", fontWeight: 700, marginBottom: "20px" },
    table: { width: "100%", borderCollapse: "collapse", marginTop: "20px" },
    th: { textAlign: "left", padding: "15px", borderBottom: "1px solid #334155", color: "#06b6d4", textTransform: "uppercase" },
    td: { padding: "10px", borderBottom: "1px solid #334155" },
    input: { padding: "6px 10px", borderRadius: "6px", border: "1px solid #334155", backgroundColor: "#1e293b", color: "#e2e8f0" },
    button: { padding: "6px 12px", borderRadius: "6px", background: "linear-gradient(45deg, #06b6d4, #3b82f6)", color: "#0f172a", border: "none", cursor: "pointer" },
    card: { backgroundColor: "#1e293b", borderRadius: "12px", padding: "25px", boxShadow: "0 10px 25px rgba(0,0,0,0.2)", marginBottom: "30px" }
  };

  return (
    <div style={styles.root}>
      <div style={styles.container}>
        <h1 style={styles.headerH1}>Admin - Gerenciar Moedas</h1>

        <div style={styles.card}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>#</th>
                <th style={styles.th}>Nome</th>
                <th style={styles.th}>Símbolo</th>
                <th style={styles.th}>Quantidade</th>
                <th style={styles.th}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {moedas.map((m, i) => {
                const [nome, setNome] = useState(m.nome);
                const [simbolo, setSimbolo] = useState(m.simbolo);
                const [quantidade, setQuantidade] = useState(m.quantidade);

                return (
                  <tr key={m.id}>
                    <td style={styles.td}>{i + 1}</td>
                    <td style={styles.td}>
                      <input style={styles.input} value={nome} onChange={(e) => setNome(e.target.value)} />
                    </td>
                    <td style={styles.td}>
                      <input style={styles.input} value={simbolo} onChange={(e) => setSimbolo(e.target.value)} />
                    </td>
                    <td style={styles.td}>
                      <input type="number" style={styles.input} value={quantidade} onChange={(e) => setQuantidade(e.target.value)} />
                    </td>
                    <td style={styles.td}>
                      <button
                        style={styles.button}
                        onClick={() => atualizarMoeda(m.id, nome, simbolo, quantidade)}
                      >
                        Salvar
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
