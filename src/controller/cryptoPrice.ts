const axios = require('axios');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

export async function getCryptoPrices() {
  try {
    let start = 1;
    let total = 0;
    let response;

    do {
      // Faz a Chamada à API da CoinMarkCap
      response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
        headers: {
          'X-CMC_PRO_API_KEY': '73ef8b4d-8c7d-4934-bceb-4e72a823ce3a', // Insira aqui a sua chave de API da CoinMarketCap
        },
        params: {
          start,
          limit: 5000, // Aumenta o limite para 5000 (o máximo permitido pela API)
        },
      });

      // Extrair os dados das criptomoedas do corpo da resposta da API
      const cryptoData = response.data.data;

      // Itera sobre os dados das criptomoedas e salva cada uma no banco de dados
      for (let i = 0; i < cryptoData.length; i++) {
        const { id, name, symbol, quote } = cryptoData[i];
        const { USD: { price } } = quote;

        // Insere os dados da criptomoeda no banco de dados usando o Prisma
        await prisma.cryptoPrice.create({
          data: {
            coinMarketCapId: id,
            name: name,
            symbol: symbol,
            price: price,
          },
        });
      }

      total += cryptoData.length;
      start += 5000; // Aumenta o start para buscar os próximos resultados
    } while (response.data.status.error_code === 0 && total < response.data.status.total_count);

    console.log(`Dados Das Cryptomoedas Atualizados Com Sucesso. Total de ${total} criptomoedas salvas.`);
  } catch (error) {
    console.error(`Erro ao atualizar dados das Criptomoedas: ${error}`);
  }
}

setInterval(getCryptoPrices, 5 * 60 * 1000);
