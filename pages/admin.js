import { useEffect, useState } from "react";

export default function Admin() {
  const [moedas, setMoedas] = useState([]);
  const [novoNome, setNovoNome] = useState("");
  const [novoSimbolo, setNovoSimbolo] = useState("");
  const [novaCategoria, setNovaCategoria] = useState("top_crypto");

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

  async function atualizarQuantidade(id, quantidade) {
    try {
      const res = await fetch("/api/update-quantidade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, quantidade }),
      });
      const data = await res.json();
      if (data.success) {
        setMoedas((old) =>
          old.map((m) =>
            m.id === id ? { ...m, quantidade: parseFloat(quantidade) } : m
          )
        );
      }
    } catch (err) {
      console.error("Erro ao atualizar quantidade:", err);
    }
  }

  async function atualizarNomeSimbolo(id, nome, simbolo) {
    try {
      const res = await fetch("/api/update-nome-simbolo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, nome, simbolo }),
      });
      const data = await res.json();
      if (data.success) {
        setMoedas((old) =>
          old.map((m) =>
            m.id === id ? { ...m, nome, simbolo } : m
          )
        );
      }
    } catch (err) {
      console.error("Erro ao atualizar nome/símbolo:", err);
    }
  }

  async function adicionarMoeda() {
    if (!novoNome || !novoSimbolo) return alert("Nome e símbolo são obrigatórios");
    try {
      const res = await fetch("/api/add-moeda", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome: novoNome, simbolo: novoSimbolo, categoria: novaCategoria }),
      });
      const data = await res.json();
      if (data.success) {
        setMoedas((old) => [...old, data.moeda]);
        setNovoNome("");
        setNovoSimbolo("");
      }
    } catch (err) {
      console.error("Erro ao adicionar moeda:", err);
    }
  }

  return (
    <div style={{ padding: "40px", fontFamily: "'Montserrat', sans-serif", backgroundColor: "#0f172a", color: "#e2e8f0", minHeight: "100vh" }}>
      <h1>Admin - HODL Fundo Cripto</h1>

      <h2>Inserir nova moeda</h2>
      <input placeholder="Nome" value={novoNome} onChange={(e) => setNovoNome(e.target.value)} />
      <input placeholder="Símbolo" value={novoSimbolo} onChange={(e) => setNovoSimbolo(e.target.value)} />
      <select value={novaCategoria} onChange={(e) => setNovaCategoria(e.target.value)}>
        <option value="top_crypto">Top Crypto</option>
        <option value="memecoin">Memecoin</option>
        <option value="nova">Nova/Comunidade</option>
      </select>
      <button onClick={adicionarMoeda}>Adicionar</button>

      <h2>Editar moedas existentes</h2>
      <table style={{ width: "100%", marginTop: "20px", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Símbolo</th>
            <th>Quantidade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {moedas.map((m) => (
            <tr key={m.id}>
              <td>{m.id}</td>
              <td>
                <input
                  value={m.nome}
                  onChange={(e) => atualizarNomeSimbolo(m.id, e.target.value, m.simbolo)}
                />
              </td>
              <td>
                <input
                  value={m.simbolo}
                  onChange={(e) => atualizarNomeSimbolo(m.id, m.nome, e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={m.quantidade}
                  onChange={(e) => atualizarQuantidade(m.id, e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
