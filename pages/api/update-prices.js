import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function atualizarPrecos() {
  try {
    const moedas = await prisma.moeda.findMany();
    if (moedas.length === 0) {
      console.log("Nenhuma moeda cadastrada.");
      return;
    }

    const symbols = moedas.map(m => m.simbolo).join(",");
    const response = await fetch(
      `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${symbols}`,
      { headers: { "X-CMC_PRO_API_KEY": process.env.API_COINMARKETCAP } }
    );

    const data = await response.json();
    console.log("CMC data:", data);

    if (!data.data) throw new Error("Erro ao buscar dados da CMC");

    const updates = Object.keys(data.data).map(symbol => {
      const moedaCMC = data.data[symbol];
      if (!moedaCMC) return null;
      const preco = moedaCMC.quote?.USD?.price ?? 0;
      return prisma.moeda.updateMany({
        where: { simbolo: symbol },
        data: { preco_atual_usd: preco }
      });
    }).filter(u => u !== null);

    await Promise.all(updates);
    console.log("Preços atualizados com sucesso!", updates.length);

  } catch (err) {
    console.error("Erro ao atualizar preços:", err);
  }
}

atualizarPrecos();
