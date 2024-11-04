import React, { useState } from "react";
import "./MainHeader.css";
import axios from "axios";
import ErrorMessage from "./ErrorMessage";

const MainHeader = () => {
  const [url, setUrl] = useState("");
  const [isError, setIsError] = useState(false);
  const [whereWasPurchased, setWhereWasPurchased] = useState([]);
  const [productList, setProductList] = useState([]);
  const [prices, setPrices] = useState([]);
  const [emissionDate, setEmissionDate] = useState("");

  const handleInputChange = (e) => {
    setUrl(e.target.value);
    setIsError(false);
  };

  // previne que o form seja enviado e carregue nova pag, e vê se o link está certo
  const handleSubmit = async (e) => {
    e.preventDefault();

    const inputIncludesRightLink = url.includes("https://sat.sef.sc.gov.br/");
    if (inputIncludesRightLink) {
      setIsError(false);
      returnData();
    } else {
      setIsError(true);
    }
  };

  const returnData = async () => {
    try {
      const response = await axios.post("http://192.168.2.9:3000/scrape", {
        url: url
      });

      setWhereWasPurchased(response.data.data.local);
      setProductList(response.data.data.items);
      setPrices(response.data.data.prices);
      setEmissionDate(response.data.data.emissionDate);
    } catch (error) {
      console.log(error);
    }
  };

  const createTableData = (items, id) => {
    const getElement = document.getElementById(id);
    items.forEach((item) => {
      const tr = document.createElement("tr");
      const td = document.createElement("td");
      const name = document.createTextNode(item);
      td.appendChild(name);
      tr.appendChild(td);
      getElement.appendChild(tr);
    });
  };
  // createTableData(whereWasPurchased, "table-row-local");
  // createTableData(productList, "table-row-products");
  // createTableData(prices, "table-row-prices");

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
          {isError && <ErrorMessage />}
        </form>
      </div>

      <div className="table-holder">
        <table className="table-style">
          <th>Local</th>
          <th>Produto</th>
          <th>Gasto</th>
          <th>Data</th>
          <tbody>
            <tr id="table-row-local">
              <td>Oi</td>
            </tr>
            <tr id="table-row-products">
              <td>Oi2</td>
            </tr>
            <tr id="table-row-prices">
              <td>oi3</td>
            </tr>
            <tr id="table-row-date">
              <td>Oi4</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MainHeader;
