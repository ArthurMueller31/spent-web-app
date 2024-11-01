import React from 'react'
import "./Navbar.css"
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="main-navbar">
      <img className="spent-logo" src='../spent-logo-text-right.png' alt='app-logo' />
      <Link to={"/sobre"}>Sobre</Link>
    </nav>
  )
}

export default Navbar