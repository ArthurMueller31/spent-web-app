import React, { useState, useRef, useEffect } from "react";
import "./MainHeader.css";
import axios from "axios";
import ErrorMessage from "./ErrorMessage";

const MainHeader = () => {
  const [url, setUrl] = useState("");
  const [isError, setIsError] = useState(false);
  const [invoices, setInvoices] = useState([]);
  const detailsRefs = useRef([]);

  const handleInputChange = (e) => {
    setUrl(e.target.value);
    setIsError(false);
  };

  // previne que o form seja enviado e carregue nova pag, e vê se o link está certo (validando no front pra nem chegar a usar o scraping se estiver errado)
  const handleSubmit = (e) => {
    e.preventDefault();

    const inputIncludesRightLink = url.includes("https://sat.sef.sc.gov.br/");
    if (inputIncludesRightLink) {
      setIsError(false);
      returnData(); // chama a func que faz o scraping
    } else {
      setIsError(true);
    }
  };

  // formata a data pra ficar em ordem, pois o new Date entende apenas data ano/mês/dia
  const formatDateForSorting = (dateString) => {
    const [day, month, year] = dateString.split("/");
    return `${year}-${month}-${day}`;
  };

  // pega a resposta do scraping com a url dada pelo user
  const returnData = async () => {
    try {
      const response = await axios.post("http://192.168.2.9:3000/scrape", {
        url: url
      });

      // dados retornados armazenados nos sets do useState
      // não precisa mostrar quais os itens por enquanto, será mostrado na pag de info
      const newInvoice = {
        url,
        whereWasPurchased: response.data.data.local,
        emissionDate: response.data.data.emissionDate,
        totalSpent: response.data.data.totalSpent,
        totalItems: response.data.data.totalItems,
        productList: response.data.data.items,
        prices: response.data.data.prices,
        showDetails: false
      };

      setInvoices((prevInvoices) => {
        const isDuplicate = prevInvoices.some(
          (invoice) => invoice.url === newInvoice.url
        );
        if (!isDuplicate) {
          const sortedInvoices = [...prevInvoices, newInvoice].sort(
            (a, b) =>
              new Date(formatDateForSorting(b.emissionDate)) -
              new Date(formatDateForSorting(a.emissionDate))
          );

          return sortedInvoices;
        } else {
          alert("Você já inseriu esse link anteriormente.");
          return prevInvoices; // Retorna o array sem mudanças se for duplicada
        }
      });
    } catch (error) {
      alert(
        "Algo deu errado. Confira se o link inserido está correto.\nCaso você tenha certeza que está correto, contate-nos para suporte."
      );
    }
  };

  const toggleDetails = (index) => {
    setInvoices((prevInvoices) =>
      prevInvoices.map((invoice, i) =>
        i === index
          ? { ...invoice, showDetails: !invoice.showDetails }
          : invoice
      )
    );
  };

  // smooth scrolling
  useEffect(() => {
    const openedIndex = invoices.findIndex((invoice) => invoice.showDetails);
    if (openedIndex !== -1 && detailsRefs.current[openedIndex]) {
      detailsRefs.current[openedIndex].scrollIntoView({
        behavior: "smooth",
        block: "start",
        
      });
    }
  }, [invoices]);

  return (
    <>
      <div className="texts-holder">
        <h1 className="welcome-text">Bem-vindo ao Spent</h1>
        <p className="paragraphs">
          Você pode começar a adicionar seus gastos inserindo o link da nota
          fiscal no campo abaixo.
        </p>
        <p className="paragraphs">
          Em caso de dúvidas, dê uma olhada na página Sobre.
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
        <table className="table-style">
          <thead>
            <tr>
              <th>Local da Compra</th>
              <th>Qtd. de Produtos</th>
              <th>Gasto Total</th>
              <th>Data da Compra</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice, index) => (
              <React.Fragment key={index}>
                <tr
                  onClick={() => toggleDetails(index)}
                  className={invoice.showDetails ? "open" : ""}
                  ref={(el) => (detailsRefs.current[index] = el)} // definindo referência
                >
                  <td>{invoice.whereWasPurchased}</td>
                  <td>{invoice.totalItems}</td>
                  <td>{invoice.totalSpent}</td>
                  <td>{invoice.emissionDate}</td>
                </tr>
                {invoice.showDetails && (
                  <tr style={{ backgroundColor: "white" }}>
                    <td colSpan={"4"} style={{ cursor: "default" }}>
                      <table className="details-table">
                        <thead>
                          <tr>
                            <th>Produto</th>
                            <th style={{ textAlign: "center" }}>Preço</th>
                          </tr>
                        </thead>
                        <tbody>
                          {invoice.productList.map((product, i) => (
                            <tr key={i}>
                              <td style={{ cursor: "text" }}>{product}</td>
                              <td
                                style={{
                                  textAlign: "center",
                                  cursor: "text"
                                }}
                              >
                                {invoice.prices[i]}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MainHeader;
