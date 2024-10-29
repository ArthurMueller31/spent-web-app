import React from 'react'
import "./MainHeader.css"

const MainHeader = () => {
  return (
    <nav className='main-navbar'>
      <div className='texts-holder'>
        <h1 className='welcome-text'>Bem-vindo</h1>
        <p className='paragraphs'>Você pode começar a adicionar seus
          gastos inserindo o link da nota fiscal no campo abaixo</p>

        <p className='paragraphs'>Insira o link aqui</p>
        <form className='form-send-link'>
          <input placeholder='https://sat.sef.sc.gov.br/SeuLinkAqui' className='input-style'/>
            
          <button className='button-style'>Salvar gastos</button>
        </form>
      </div>
    </nav>
  )
}

export default MainHeader