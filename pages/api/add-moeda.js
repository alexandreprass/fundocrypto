import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Método não permitido" });

  const { nome, simbolo, categoria } = req.body;
  if (!nome || !simbolo || !categoria)
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });

  try {
    const novaMoeda = await prisma.moeda.create({
      data: { nome, simbolo, categoria, preco_atual_usd: 0, quantidade: 0 },
    });
    res.status(200).json({ success: true, moeda: novaMoeda });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao adicionar moeda" });
  }
}
