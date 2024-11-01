import React, { useState } from "react";
import "./MainHeader.css";
import axios from "axios";
import ErrorMessage from "./ErrorMessage";

const MainHeader = () => {
  const [inputValue, setInputValue] = useState("");
  const [isError, setIsError] = useState(false);
  //  const [submittedValue, setSubmittedValue] = useState("")

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setIsError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const inputIncludesRightLink = inputValue.includes(
      "https://sat.sef.sc.gov.br/"
      
    );
    if (inputIncludesRightLink) {
      setIsError(false);
      try {
        const response = await axios.post("http:192.168.2.9:3000/scrape", {
          valor: inputValue
        });
        console.log(response.data.message);
      } catch (error) {
        console.error("Erro ao enviar valor para o backend", error);
      }
    } else {
      setIsError(true)
    }
  };

  return (
    <div className="texts-holder">
      <h1 className="welcome-text">Bem-vindo ao Spent</h1>
      <p className="paragraphs">
        Você pode começar a adicionar seus gastos inserindo o link da nota
        fiscal no campo abaixo.
      </p>

      <p className="paragraphs">Insira o link aqui</p>
      <form className="form-send-link">
        <input
          type="text"
          placeholder="https://sat.sef.sc.gov.br/SeuLinkAqui"
          className="input-style"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button type="submit" className="button-style" onClick={handleSubmit}>
          Salvar gastos
        </button>
        {isError && <ErrorMessage />}
      </form>
    </div>
  );
};

export default MainHeader;
