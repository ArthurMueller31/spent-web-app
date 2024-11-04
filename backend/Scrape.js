const pup = require("puppeteer");

if (!Scrape.includes("https://sat.sef.sc.gov.br/")) {
  console.log("url errada");
}

  (async () => {
    const browser = await pup.launch({ headless: true });
    const page = await browser.newPage();
    console.log("Iniciei");
  
    await page.goto(Scrape);
    console.log("fui pra url");

    const marketName = await page.$$eval(".txtTopo", (el) => el.map((text) => text.textContent))
    console.log(marketName)
  
    const itemDescriptions = await page.$$eval(".txtTit", (el) =>
      el.map((text) => text.textContent)
    );
    formatArrayFromTextContent(itemDescriptions);
    function formatArrayFromTextContent(itemDescriptions) {
      for (let i = 0; i < itemDescriptions.length; i++) {
        console.log(itemDescriptions.splice(i, 1)); // deleta os valores que não precisa
      }
    }
  
    const prices = await page.$$eval(".valor", (el) =>
      el.map((price) => price.textContent)
    );
    console.log(prices);
    // OK
  
    const date = await page.$$eval(".ui-li-static", (el) =>    // data de emissão
      el.map((text) => text.textContent)
    );

    const newDate = (date[0].indexOf("Emissão:")); // isso aqui vai ter que reconhecer quando está escrito emissão
    checkEmission(newDate)

    function checkEmission(newDate) {
      const finalEmission = date[0].slice(newDate, newDate + 19)
      console.log(finalEmission);
    }
    await browser.close();
  })();

function Scrape({ sentValue }) {
  console.log(sentValue)
}

export default Scrape;
