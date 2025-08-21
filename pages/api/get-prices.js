export default async function handler(req, res) {
  try {
    const apiKey = process.env.API_COINMARKETCAP;

    const response = await fetch(
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=50&convert=USD",
      {
        headers: {
          "X-CMC_PRO_API_KEY": apiKey,
        },
      }
    );

    const data = await response.json();

    // sua carteira de exemplo (categorias para bater com o HTML)
    const carteira = [
      { id: 1, nome: "Bitcoin", simbolo: "BTC", quantidade: 0.5, categoria: "top_crypto" },
      { id: 1027, nome: "Ethereum", simbolo: "ETH", quantidade: 2, categoria: "top_crypto" },
      { id: 74, nome: "Dogecoin", simbolo: "DOGE", quantidade: 10000, categoria: "memecoin" },
      { id: 5994, nome: "Shiba Inu", simbolo: "SHIB", quantidade: 5000000, categoria: "memecoin" }
    ];

    const moedas = carteira.map((c) => {
      const moedaCMC = data.data.find((m) => m.id === c.id);
      const preco = moedaCMC ? moedaCMC.quote.USD.price : 0;

      return {
        id: c.id,
        nome: c.nome,
        simbolo: c.simbolo,
        quantidade: c.quantidade,
        preco_atual_usd: preco,
        categoria: c.categoria
      };
    });

    res.status(200).json(moedas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar preços" });
  }
}
