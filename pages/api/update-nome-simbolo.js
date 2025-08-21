import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Método não permitido" });

  const { id, nome, simbolo } = req.body;
  if (!id || !nome || !simbolo)
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });

  try {
    const moedaAtualizada = await prisma.moeda.update({
      where: { id: parseInt(id) },
      data: { nome, simbolo },
    });
    res.status(200).json({ success: true, moeda: moedaAtualizada });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao atualizar moeda" });
  }
}
