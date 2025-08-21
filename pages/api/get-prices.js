import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    const moedas = await prisma.moeda.findMany({
      orderBy: { id: "asc" }
    });
    res.status(200).json(moedas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar dados" });
  }
}
