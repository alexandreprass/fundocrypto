import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    // Lista de símbolos que estão no seu banco
    const symbols = "BTC,ETH,BNB,SOL,XRP,TON,ADA,AVAX,DOGE,DOT,SHIB,PEPE,FLOKI,BONK,BABYDOGE,ELON,VOLT,BITCOIN,KISHU";

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
      throw new Error("Erro ao puxar dados da CoinMarketCap");
    }

    // Atualiza no banco cada símbolo
    const updates = Object.keys(data.data).map(async (symbol) => {
      const price = data.data[symbol].quote.USD.price;

      return prisma.moeda.updateMany({
        where: { simbolo: symbol },
        data: { preco_atual_usd: price },
      });
    });

    await Promise.all(updates);

    return res.status(200).json({ success: true, updated: updates.length });
  } catch (error) {
    console.error("Erro update-prices:", error);
    return res.status(500).json({ error: "Erro ao atualizar preços" });
  }
}
