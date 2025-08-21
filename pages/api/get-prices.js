import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ error: "Método não permitido" });

  try {
    const moedas = await prisma.moeda.findMany();
    res.status(200).json(moedas);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar moedas" });
  }
}
