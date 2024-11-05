import React, { useState } from "react";
import "./MainHeader.css";
import axios from "axios";
import ErrorMessage from "./ErrorMessage";

const MainHeader = () => {
  const [url, setUrl] = useState("");
  const [isError, setIsError] = useState(false);
  const [whereWasPurchased, setWhereWasPurchased] = useState("");
  // const [productList, setProductList] = useState([]);
  // const [prices, setPrices] = useState([]);
  // vou usar depois com a nova pag de info das compras
  const [emissionDate, setEmissionDate] = useState("");
  const [totalSpent, setTotalSpent] = useState("");
  const [totalItems, setTotalItems] = useState("");

  const handleInputChange = (e) => {
    setUrl(e.target.value);
    setIsError(false);
  };

  // previne que o form seja enviado e carregue nova pag, e vê se o link está certo (validando no front pra nem chegar a usar o scraping se estiver errado)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const inputIncludesRightLink = url.includes("https://sat.sef.sc.gov.br/");
    if (inputIncludesRightLink) {
      setIsError(false);
      returnData(); // chama a func que faz o scraping
    } else {
      setIsError(true);
    }
  };

  // pega a resposta do scraping com a url dada pelo user
  const returnData = async () => {
    try {
      const response = await axios.post("http://192.168.2.9:3000/scrape", {
        url: url
      });

      // dados retornados armazenados nos sets do useState
      // não precisa mostrar quais os itens por enquanto, será mostrado na pag de info
      setWhereWasPurchased(response.data.data.local);
      // setProductList(response.data.data.items.length);
      // setPrices(response.data.data.prices.length);
      setEmissionDate(response.data.data.emissionDate);
      setTotalSpent(response.data.data.totalSpent);
      setTotalItems(response.data.data.totalItems);
    } catch (error) {
      console.log(error);
    }
  };

 // aqui estava o código do useEffect

  return (
    <>
      <div className="texts-holder">
        <h1 className="welcome-text">Bem-vindo ao Spent</h1>
        <p className="paragraphs">
          Você pode começar a adicionar seus gastos inserindo o link da nota
          fiscal no campo abaixo.
        </p>
        <p className="paragraphs">
          Em caso de dúvidas, dê uma olhada na página Sobre; e se a dúvida
          persistir, sinta-se à vontade para me mandar um e-mail.
        </p>

        <p className="paragraphs">Insira o link aqui</p>
        <form className="form-send-link">
          <input
            type="text"
            placeholder="https://sat.sef.sc.gov.br/SeuLinkAqui"
            className="input-style"
            value={url}
            onChange={handleInputChange}
          />
          <button type="submit" className="button-style" onClick={handleSubmit}>
            Salvar gastos
          </button>
        </form>
        <div>{isError && <ErrorMessage />}</div>
      </div>

      <div className="table-holder">
        <table id="where-was-bought" className="table-style">
          <tr>
            <th>Local da Compra</th>
          </tr>
          <tr className="td-">{whereWasPurchased !== "" && <td>{whereWasPurchased}</td>}</tr>
        </table>
        <table id="product">
          <tr className="tr-styles">
            <th>Qtd. de Produtos</th>
          </tr>
          <tr>{totalItems !== "" && <td>{totalItems}</td>}</tr>
        </table>
        <table id="spent">
          <tr className="tr-styles">
            <th>Gasto Total</th>
          </tr>
          <tr>{totalSpent !== "" && <td>{totalSpent}</td>}</tr>
        </table>
        <table id="date">
          <tr className="tr-styles">
            <th>Data da Compra</th>
          </tr>
          <tr>
            {emissionDate !== "" && <td>{emissionDate}</td>}
          </tr>
        </table>
      </div>
    </>
  );
};

export default MainHeader;
