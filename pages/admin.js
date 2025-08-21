import { useEffect, useState } from "react";

export default function Admin() {
  const [moedas, setMoedas] = useState([]);
  const [novaMoeda, setNovaMoeda] = useState({ nome: "", simbolo: "", categoria: "top_crypto", quantidade: 0 });

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

  const atualizarMoeda = async (id) => {
    const moeda = moedas.find((m) => m.id === id);
    if (!moeda) return;

    try {
      await fetch("/api/update-moeda", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(moeda),
      });
      alert("Moeda atualizada!");
    } catch (err) {
      console.error("Erro ao atualizar moeda:", err);
      alert("Erro ao atualizar moeda.");
    }
  };

  const adicionarMoeda = async () => {
    try {
      const res = await fetch("/api/add-moeda", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novaMoeda),
      });
      const data = await res.json();
      setMoedas((prev) => [...prev, data]);
      setNovaMoeda({ nome: "", simbolo: "", categoria: "top_crypto", quantidade: 0 });
      alert("Nova moeda adicionada!");
    } catch (err) {
      console.error("Erro ao adicionar moeda:", err);
      alert("Erro ao adicionar moeda.");
    }
  };

  const handleChange = (id, field, value) => {
    setMoedas((prev) =>
      prev.map((m) => (m.id === id ? { ...m, [field]: value } : m))
    );
  };

  const styles = {
    root: { fontFamily: "'Montserrat', sans-serif", backgroundColor: "#0f172a", color: "#e2e8f0", padding: "40px 20px", minHeight: "100vh" },
    container: { maxWidth: "1100px", margin: "0 auto" },
    headerH1: { fontSize: "2.5em", fontWeight: 700, marginBottom: "20px" },
    table: { width: "100%", borderCollapse: "collapse", marginTop: "20px" },
    th: { textAlign: "left", padding: "15px", borderBottom: "1px solid #334155", color: "#06b6d4", textTransform: "uppercase" },
    td: { padding: "10px", borderBottom: "1px solid #334155" },
    input: { padding: "6px 10px", borderRadius: "6px", border: "1px solid #334155", backgroundColor: "#1e293b", color: "#e2e8f0" },
    button: { padding: "6px 12px", borderRadius: "6px", background: "linear-gradient(45deg, #06b6d4, #3b82f6)", color: "#0f172a", border: "none", cursor: "pointer", marginTop: "10px" },
    card: { backgroundColor: "#1e293b", borderRadius: "12px", padding: "25px", boxShadow: "0 10px 25px rgba(0,0,0,0.2)", marginBottom: "30px" },
    formGroup: { marginBottom: "10px" }
  };

  return (
    <div style={styles.root}>
      <div style={styles.container}>
        <h1 style={styles.headerH1}>Admin - Gerenciar Moedas</h1>

        {/* Formulário para adicionar nova moeda */}
        <div style={styles.card}>
          <h2>Adicionar Nova Moeda</h2>
          <div style={styles.formGroup}>
            <input
              style={styles.input}
              placeholder="Nome"
              value={novaMoeda.nome}
              onChange={(e) => setNovaMoeda({ ...novaMoeda, nome: e.target.value })}
            />
          </div>
          <div style={styles.formGroup}>
            <input
              style={styles.input}
              placeholder="Símbolo"
              value={novaMoeda.simbolo}
              onChange={(e) => setNovaMoeda({ ...novaMoeda, simbolo: e.target.value })}
            />
          </div>
          <div style={styles.formGroup}>
            <select
              style={styles.input}
              value={novaMoeda.categoria}
              onChange={(e) => setNovaMoeda({ ...novaMoeda, categoria: e.target.value })}
            >
              <option value="top_crypto">Top Criptomoeda</option>
              <option value="memecoin">Memecoin</option>
              <option value="nova">Nova / Comunidade</option>
            </select>
          </div>
          <div style={styles.formGroup}>
            <input
              type="number"
              style={styles.input}
              placeholder="Quantidade"
              value={novaMoeda.quantidade}
              onChange={(e) => setNovaMoeda({ ...novaMoeda, quantidade: parseFloat(e.target.value) })}
            />
          </div>
          <button style={styles.button} onClick={adicionarMoeda}>Adicionar Moeda</button>
        </div>

        {/* Tabela de moedas existentes */}
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
              {moedas.map((m, i) => (
                <tr key={m.id}>
                  <td style={styles.td}>{i + 1}</td>
                  <td style={styles.td}>
                    <input style={styles.input} value={m.nome} onChange={(e) => handleChange(m.id, "nome", e.target.value)} />
                  </td>
                  <td style={styles.td}>
                    <input style={styles.input} value={m.simbolo} onChange={(e) => handleChange(m.id, "simbolo", e.target.value)} />
                  </td>
                  <td style={styles.td}>
                    <input type="number" style={styles.input} value={m.quantidade} onChange={(e) => handleChange(m.id, "quantidade", e.target.value)} />
                  </td>
                  <td style={styles.td}>
                    <button style={styles.button} onClick={() => atualizarMoeda(m.id)}>Salvar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
