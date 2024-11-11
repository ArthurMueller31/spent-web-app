import React, { useState, useRef, useEffect } from "react";
import "./MainHeader.css";
import axios from "axios";
import ErrorMessage from "./ErrorMessage";

const MainHeader = () => {
  const [url, setUrl] = useState("");
  const [isError, setIsError] = useState(false);
  const [invoices, setInvoices] = useState([]);
  const [lastOpenedIndex, setLastOpenedIndex] = useState(null);
  const [totalSpentSum, setTotalSpentSum] = useState(0);
  const detailsRefs = useRef([]);

  const handleInputChange = (e) => {
    setUrl(e.target.value);
    setIsError(false);
  };

  const clearInput = () => {
    setUrl("");
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
      const newInvoice = {
        url,
        whereWasPurchased: response.data.data.local,
        emissionDate: response.data.data.emissionDate,
        totalSpent: response.data.data.totalSpent, // agora deve receber valor em float
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

          console.log(newInvoice.totalSpent);

          calculateTotalSpent([...prevInvoices, newInvoice]); // atualizar total acumulado

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

  const calculateTotalSpent = (invoicesList) => {
    // calcular o total baseado nas notas anteriores e atual
    const total = invoicesList.reduce(
      (acc, invoice) => acc + parseFloat(invoice.totalSpent),
      0
    );
    setTotalSpentSum(total);
  };

  // useEffect(() => {
  //   // salvar notas no localStorage quando o estado mudar
  //   localStorage.setItem("invoices", JSON.stringify(invoices));
  // }, [invoices]);

  // useEffect(() => {
  //   // carregar notas do localStorage quando iniciar
  //   const savedInvoices = localStorage.getItem("invoices");
  //   if (savedInvoices) {
  //     setInvoices(JSON.parse(savedInvoices));
  //   }
  // }, []);

  // alterna entre abrir/fechar detalhes da nota
  const toggleDetails = (index) => {
    setInvoices((prevInvoices) =>
      prevInvoices.map((invoice, i) =>
        i === index
          ? { ...invoice, showDetails: !invoice.showDetails }
          : invoice
      )
    );

    // armazena último index que foi pego, servindo pra fazer o smooth scroll depois
    if (!invoices[index].showDetails) {
      setLastOpenedIndex(index);
    }
  };

  // deletar nota fiscal registrada
  const deleteInvoice = (index, e) => {
    e.stopPropagation(); // impede que afete child ou parent
    setInvoices((prevInvoices) => {
      const updatedInvoices = prevInvoices.filter((_, i) => i !== index);
      calculateTotalSpent(updatedInvoices);
      return updatedInvoices;
    });
  };

  // smooth scrolling
  useEffect(() => {
    if (
      lastOpenedIndex !== null &&
      invoices[lastOpenedIndex] &&
      invoices[lastOpenedIndex].showDetails
    ) {
      detailsRefs.current[lastOpenedIndex].scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  }, [invoices, lastOpenedIndex]);

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

          <button type="button" onClick={clearInput} className="clear-button">
            Limpar entrada
          </button>
        </form>
        <div>{isError && <ErrorMessage />}</div>
      </div>

      <div className="total-spent-div">
        Gastos totais: R$
        {totalSpentSum.toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })}
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
                  <td>
                    {invoice.totalSpent.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}
                    {/* aplica a mesma lógica para deixar os números formatados conforme o padrão brasileiro de escrita de R$  */}
                  </td>

                  <td>{invoice.emissionDate}</td>
                </tr>
                {invoice.showDetails && (
                  <tr style={{ backgroundColor: "white" }}>
                    <td
                      colSpan={"4"}
                      style={{ cursor: "default", paddingBottom: 0 }}
                    >
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
                      <div className="delete-button-holder">
                        <button
                          className="delete-button"
                          onClick={(e) => {
                            deleteInvoice(index, e);
                          }}
                        >
                          Excluir
                        </button>
                      </div>
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
