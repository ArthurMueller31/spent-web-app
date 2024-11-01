import React from 'react'
import "./Navbar.css"

const Navbar = () => {
  return (
    <nav className="main-navbar">
      <img className="spent-logo" src='../spent-logo-text-right.png' alt='app-logo' />
      <a href='about'>Sobre</a>
    </nav>
  )
}

export default Navbar