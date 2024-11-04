import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    const createTableData = (items, id) => {
      const table = document.getElementById(id);

      const rows = table.querySelectorAll("tr:not(:first-child)");
      rows.forEach((row) => row.remove());

      items.forEach((item) => {
        const tr = document.createElement("tr");
        const td = document.createElement("td");
        td.textContent = item;
        tr.appendChild(td);
        table.appendChild(tr);
      });
    };

    createTableData(whereWasPurchased, "where-was-bought");
    createTableData(productList, "product");
    createTableData(prices, "spent");
  }, [whereWasPurchased, productList, prices]);

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
            <th>Local</th>
          </tr>
        </table>
        <table id="product">
          <tr className="tr-styles">
            <th>Produto</th>
          </tr>
        </table>
        <table id="spent">
          <tr className="tr-styles">
            <th>Gasto</th>
          </tr>
        </table>
        <table id="date">
          <tr className="tr-styles">
            <th>Data</th>
          </tr>
          <tr className="date-style">
            {emissionDate !== "" && <td>{emissionDate}</td>}
          </tr>
        </table>
      </div>
    </>
  );
};

export default MainHeader;
