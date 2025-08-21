import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const { id, quantidade } = req.body;

  try {
    const moeda = await prisma.moeda.update({
      where: { id: id },
      data: { quantidade },
    });

    res.status(200).json(moeda);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar quantidade" });
  }
}
