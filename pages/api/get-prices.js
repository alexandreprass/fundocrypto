import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    // 1️⃣ Pega todas as moedas
    const moedas = await prisma.moeda.findMany();

    if (moedas.length === 0) return res.status(200).json([]);

    // 2️⃣ Pega apenas símbolos com quantidade > 0
    const moedasComQtd = moedas.filter(m => m.quantidade > 0);
    const symbols = moedasComQtd.map(m => m.simbolo).join(",");

    let dataCMC = {};
    if (symbols) {
      // 3️⃣ Chamada única à API da CMC
      const response = await fetch(
        `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${symbols}`,
        { headers: { "X-CMC_PRO_API_KEY": process.env.API_COINMARKETCAP } }
      );
      const json = await response.json();
      if (json.data) dataCMC = json.data;
    }

    // 4️⃣ Atualiza preços no banco
    const updates = Object.keys(dataCMC).map(symbol => {
      const preco = dataCMC[symbol]?.quote?.USD?.price ?? 0;
      return prisma.moeda.updateMany({
        where: { simbolo: symbol },
        data: { preco_atual_usd: preco },
      });
    });

    await Promise.all(updates);

    // 5️⃣ Retorna todas as moedas (com preços atualizados)
    const moedasAtualizadas = await prisma.moeda.findMany();
    res.status(200).json(moedasAtualizadas);

  } catch (err) {
    console.error("Erro get-prices:", err);
    res.status(500).json({ error: "Erro ao buscar moedas" });
  }
}
