import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Chama a API que atualiza os preços no banco
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/update-prices`);
    if (!res.ok) {
      throw new Error(`Erro ao atualizar preços: ${res.statusText}`);
    }

    const data = await res.json();
    return NextResponse.json({ success: true, message: "Preços atualizados no deploy", data });
  } catch (err) {
    console.error("Erro update-on-deploy:", err);
    return NextResponse.json({ success: false, error: err.message });
  }
}
