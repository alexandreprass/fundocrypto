import { useState, useEffect } from "react";

export default function AdminPage() {
  const [autenticado, setAutenticado] = useState(false);
  const [senha, setSenha] = useState("");
  const [moedas, setMoedas] = useState([]);
  const [loading, setLoading] = useState(false);

  async function carregarMoedas() {
    const res = await fetch("/api/get-prices");
    const data = await res.json();
    setMoedas(data);
  }

  async function atualizarMoeda(id, nome, simbolo, quantidade) {
    try {
      setLoading(true);
      await fetch("/api/update-moeda", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, nome, simbolo, quantidade: parseFloat(quantidade) }),
      });
      await carregarMoedas();
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
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Simbolo</th>
            <th>Quantidade</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {moedas.map((m) => (
            <tr key={m.id}>
              <td>{m.id}</td>
              <td>
                <input
                  type="text"
                  defaultValue={m.nome}
                  onBlur={(e) => atualizarMoeda(m.id, e.target.value, m.simbolo, m.quantidade)}
                />
              </td>
              <td>
                <input
                  type="text"
                  defaultValue={m.simbolo}
                  onBlur={(e) => atualizarMoeda(m.id, m.nome, e.target.value, m.quantidade)}
                />
              </td>
              <td>
                <input
                  type="number"
                  step="any"
                  defaultValue={m.quantidade}
                  onBlur={(e) => atualizarMoeda(m.id, m.nome, m.simbolo, e.target.value)}
                />
              </td>
              <td>
                <button onClick={() => atualizarMoeda(m.id, m.nome, m.simbolo, m.quantidade)}>
                  Salvar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
