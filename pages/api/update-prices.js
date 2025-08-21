import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function atualizarPrecos() {
  try {
    const moedas = await prisma.moeda.findMany();
    const symbols = moedas.map(m => m.simbolo).join(',');

    const response = await fetch(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${symbols}`, {
      headers: { "X-CMC_PRO_API_KEY": process.env.API_COINMARKETCAP }
    });
    const data = await response.json();
    if (!data.data) throw new Error("Erro ao buscar dados da CMC");

    const updates = Object.keys(data.data).map(symbol => {
      const preco = data.data[symbol].quote.USD.price;
      return prisma.moeda.updateMany({ where: { simbolo: symbol }, data: { preco_atual_usd: preco } });
    });

    await Promise.all(updates);
    console.log("Preços atualizados com sucesso!");
    process.exit(0);
  } catch (err) {
    console.error("Erro ao atualizar preços:", err);
    process.exit(1);
  }
}

atualizarPrecos();
