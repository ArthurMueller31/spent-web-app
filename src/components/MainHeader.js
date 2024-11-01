import React, { useState } from "react";
import "./MainHeader.css";
import axios from "axios";

const MainHeader = () => {

 const [inputValue, setInputValue] = useState("");
//  const [submittedValue, setSubmittedValue] = useState("")

 const handleInputChange = (e) => {
  setInputValue(e.target.value);
 }

 const handleSubmit = async (e) => {
  try {
    const response = await axios.post('http://localhost:5000/api/enviar-valor', {
      valor: inputValue
    })
    console.log(response.data.message)
  } catch (error) {
    console.error('Erro ao enviar valor para o backend', error)
  }
  // e.preventDefault()
  // setSubmittedValue(inputValue)
 }

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
        </form>
      </div>
  );
};

export default MainHeader;
