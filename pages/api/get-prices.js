import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    // 1️⃣ Pega todas as moedas do banco
    const moedasDB = await prisma.moeda.findMany();

    if (moedasDB.length === 0) {
      return res.status(200).json([]);
    }

    // 2️⃣ Pega os símbolos para consultar na CoinMarketCap
    const symbols = moedasDB.map(m => m.simbolo).join(',');

    const response = await fetch(
      `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${symbols}`,
      {
        headers: {
          "X-CMC_PRO_API_KEY": process.env.API_COINMARKETCAP,
        },
      }
    );

    const data = await response.json();

    if (!data.data) {
      throw new Error("Erro ao buscar dados da CoinMarketCap");
    }

    // 3️⃣ Monta o array final de moedas com preço atualizado
    const moedasAtualizadas = moedasDB.map(m => {
      const moedaCMC = data.data[m.simbolo];
      const preco = moedaCMC ? moedaCMC.quote.USD.price : m.preco_atual_usd;
      return {
        id: m.id,
        nome: m.nome,
        simbolo: m.simbolo,
        categoria: m.categoria,
        quantidade: m.quantidade,
        preco_atual_usd: preco,
      };
    });

    res.status(200).json(moedasAtualizadas);
  } catch (error) {
    console.error("Erro get-prices:", error);
    res.status(500).json({ error: "Erro ao buscar moedas" });
  }
}
