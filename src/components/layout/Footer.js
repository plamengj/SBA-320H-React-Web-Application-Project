import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>PokéExplorer - SBA 320H React Web Application Project</p>
        <p>Data provided by <a href="https://pokeapi.co/" target="_blank" rel="noopener noreferrer">PokeAPI</a></p>
        <p>&copy; {new Date().getFullYear()} - All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer; 