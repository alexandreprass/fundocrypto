import { useState, useEffect } from "react";

export default function AdminPage() {
  const [autenticado, setAutenticado] = useState(false);
  const [senha, setSenha] = useState("");
  const [moedas, setMoedas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [novaMoeda, setNovaMoeda] = useState({ nome: "", simbolo: "", categoria: "top_crypto", quantidade: 0 });

  // Carrega todas as moedas do banco
  async function carregarMoedas() {
    const res = await fetch("/api/get-prices");
    const data = await res.json();
    setMoedas(data);
  }

  // Atualiza a quantidade de uma moeda existente
  async function atualizarQuantidade(id, quantidade) {
    try {
      setLoading(true);
      await fetch("/api/update-quantidade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, quantidade: parseFloat(quantidade) }),
      });
      await carregarMoedas();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  // Adiciona uma nova moeda
  async function adicionarMoeda() {
    if (!novaMoeda.nome || !novaMoeda.simbolo) {
      alert("Preencha nome e símbolo da moeda!");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/add-moeda", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novaMoeda),
      });

      const data = await res.json();

      if (data.error) {
        alert("Erro ao adicionar moeda: " + data.error);
      } else {
        alert("Moeda adicionada com sucesso!");
        setNovaMoeda({ nome: "", simbolo: "", categoria: "top_crypto", quantidade: 0 });
        await carregarMoedas();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function autenticar() {
    if (senha === "Gremio-2025") {
      setAutenticado(true);
      carregarMoedas();
    } else {
      alert("Senha incorreta!");
    }
  }

  if (!autenticado) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "100px" }}>
        <h2>🔒 Admin - Fundo Cripto</h2>
        <input
          type="password"
          placeholder="Digite a senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          style={{ padding: "10px", margin: "10px", width: "200px" }}
        />
        <button onClick={autenticar} style={{ padding: "10px 20px" }}>Entrar</button>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>⚙️ Painel Admin</h2>
      {loading && <p>Salvando alterações...</p>}

      {/* Formulário para adicionar nova moeda */}
      <div style={{ marginBottom: "30px", padding: "20px", backgroundColor: "#1e293b", borderRadius: "12px" }}>
        <h3>➕ Adicionar Nova Moeda</h3>
        <input
          type="text"
          placeholder="Nome"
          value={novaMoeda.nome}
          onChange={(e) => setNovaMoeda({ ...novaMoeda, nome: e.target.value })}
          style={{ padding: "8px", marginRight: "10px" }}
        />
        <input
          type="text"
          placeholder="Símbolo"
          value={novaMoeda.simbolo}
          onChange={(e) => setNovaMoeda({ ...novaMoeda, simbolo: e.target.value })}
          style={{ padding: "8px", marginRight: "10px" }}
        />
        <select
          value={novaMoeda.categoria}
          onChange={(e) => setNovaMoeda({ ...novaMoeda, categoria: e.target.value })}
          style={{ padding: "8px", marginRight: "10px" }}
        >
          <option value="top_crypto">Top Crypto</option>
          <option value="memecoin">Memecoin</option>
          <option value="new_crypto">Nova / Comunidade</option>
        </select>
        <input
          type="number"
          placeholder="Quantidade"
          step="any"
          value={novaMoeda.quantidade}
          onChange={(e) => setNovaMoeda({ ...novaMoeda, quantidade: parseFloat(e.target.value) })}
          style={{ padding: "8px", marginRight: "10px", width: "100px" }}
        />
        <button onClick={adicionarMoeda} style={{ padding: "8px 16px" }}>Adicionar</button>
      </div>

      {/* Tabela de moedas existentes */}
      <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "#1e293b", color: "#e2e8f0" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Moeda</th>
            <th>Quantidade</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {moedas.map((m) => (
            <tr key={m.id}>
              <td>{m.id}</td>
              <td>{m.nome} ({m.simbolo})</td>
              <td>
                <input
                  type="number"
                  step="any"
                  defaultValue={m.quantidade}
                  onBlur={(e) => atualizarQuantidade(m.id, e.target.value)}
                />
              </td>
              <td>
                <button onClick={() => atualizarQuantidade(m.id, m.quantidade)}>Salvar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
