const express = require('express');
const puppeteer = require('puppeteer');

const app = express();
app.use(express.json()); // Para processar JSON nas requisições

// Rota para realizar scraping de uma nota fiscal com base no QR code
app.post('/scrape', async (req, res) => {
  const { url } = req.body;

  // Verifica se a URL é do domínio correto
  if (!url.includes("https://sat.sef.sc.gov.br/")) {
    return res.status(400).json({ success: false, message: 'URL inválida para notas fiscais' });
  }

  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    console.log("Iniciando scraping...");

    await page.goto(url);
    console.log("Navegando para a URL...");

    // Coleta todos os elementos com a classe .txtTit
    const itemDescriptions = await page.$$eval(".txtTit", (el) =>
      el
        .filter((item) => !item.classList.contains('noWrap')) // Filtra elementos com a classe .noWrap
        .map((text) => text.textContent.trim()) // Coleta apenas o texto dos elementos desejados
    );

    console.log("Itens:", itemDescriptions); // Mostra os itens coletados

    // Coleta os preços dos itens
    const prices = await page.$$eval(".valor", (el) =>
      el.map((price) => price.textContent.trim()) // Remove espaços em branco
    );
    console.log("Preços:", prices);

    // Coleta a data de emissão
    const date = await page.$$eval(".ui-li-static", (el) =>
      el.map((text) => text.textContent)
    );

    // Encontra a posição de "Emissão" e coleta a data
    const newDateIndex = date[0].indexOf("Emissão:");
    function checkEmission(newDateIndex) {
      if (newDateIndex !== -1) {
        return date[0].slice(newDateIndex, newDateIndex + 19);
      } else {
        return "Data de emissão não encontrada";
      }
    }
    const finalEmissionDate = checkEmission(newDateIndex);
    console.log("Data de emissão:", finalEmissionDate);

    await browser.close(); // Fecha o browser

    // Retorna os dados para o frontend (React Native)
    res.json({
      success: true,
      data: {
        items: itemDescriptions,
        prices: prices,
        emissionDate: finalEmissionDate,
      },
    });
  } catch (error) {
    console.error("Erro ao fazer scraping:", error);
    res.status(500).json({ success: false, message: 'Erro ao fazer scraping' });
  }
});

// Inicializa o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
