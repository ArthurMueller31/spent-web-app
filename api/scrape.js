const puppeteer = require("puppeteer");

module.exports = async (req,res) => {
  const { url } = req.body;

  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage(); // inicia scraping

    await page.goto(url); // vai pra url
   
    const whereWasBought = await page.$$eval(".txtTopo", (el) =>
      el.map((text) => text.textContent)
    );

    // Coleta todos os elementos com a classe .txtTit
    const itemDescriptions = await page.$$eval(
      ".txtTit",
      (el) =>
        el
          .filter((item) => !item.classList.contains("noWrap")) // Filtra elementos com a classe .noWrap
          .map((text) => text.textContent.trim()) // Coleta apenas o texto dos elementos desejados
    );

    // Coleta os preços dos itens
    const prices = await page.$$eval(
      ".valor",
      (el) => el.map((price) => price.textContent.trim()) // Remove espaços em branco
    );

    // Coleta o gasto total da compra
    // vai mudar de string pra float e fazer a troca de , para .
    const totalSpent = await page.$$eval(".txtMax", (el) =>
      el.map((spent) => parseFloat(spent.textContent.replace(",", ".")))     
    );


    const totalItems = await page.$eval(".totalNumb", (el) => el.textContent);

    // Coleta a data de emissão
    const date = await page.$$eval(".ui-li-static", (el) =>
      el.map((text) => text.textContent)
    );

    // Encontra a posição de "Emissão" e coleta a data
    const newDateIndex = date[0].indexOf("Emissão:");
    const finalEmissionDate = checkEmission(newDateIndex);

    function checkEmission(newDateIndex) {
      if (newDateIndex !== -1) {
        const slicedDate = date[0]
          .slice(newDateIndex + 9, newDateIndex + 19)
          .trim();
        return slicedDate;
      } else {
        return "Data de emissão não encontrada";
      }
    }

    await browser.close(); // Fecha o browser

    // Retorna os dados para o frontend (React)
    res.json({
      success: true,
      data: {
        local: whereWasBought,
        items: itemDescriptions,
        prices,
        emissionDate: finalEmissionDate,
        totalSpent,
        totalItems
      }
    });
  } catch (error) {
    console.error("Erro ao fazer scraping:", error);
    res.status(500).json({ success: false, message: "Erro ao fazer scraping" });
  }
};
