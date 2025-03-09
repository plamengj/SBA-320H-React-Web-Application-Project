import React from 'react';
import './AboutPage.css';

const AboutPage = () => {
  return (
    <div className="about-page">
      <h1>About PokéExplorer</h1>
      
      <div className="about-section">
        <h2>Project Overview</h2>
        <p>
          PokéExplorer is a web application built for the SBA 320H React Web Application Project.
          It allows users to browse, search, and save their favorite Pokémon from the Pokémon universe.
        </p>
        <p>
          The application utilizes the PokeAPI, a free and open RESTful API that provides Pokémon data.
          Users can explore the vast collection of Pokémon, view detailed information about each one,
          and maintain a list of favorites.
        </p>
      </div>
      
      <div className="about-section">
        <h2>Technologies Used</h2>
        <ul className="tech-list">
          <li>
            <span className="tech-name">React</span>
            <span className="tech-description">Frontend JavaScript library for building user interfaces</span>
          </li>
          <li>
            <span className="tech-name">Redux Toolkit</span>
            <span className="tech-description">State management for predictable state updates and global store</span>
          </li>
          <li>
            <span className="tech-name">React Router</span>
            <span className="tech-description">Navigational components for single-page application routing</span>
          </li>
          <li>
            <span className="tech-name">Axios</span>
            <span className="tech-description">Promise-based HTTP client for making API requests</span>
          </li>
          <li>
            <span className="tech-name">PokeAPI</span>
            <span className="tech-description">External API providing comprehensive Pokémon data</span>
          </li>
          <li>
            <span className="tech-name">CSS3</span>
            <span className="tech-description">Styling with flexbox and grid for responsive design</span>
          </li>
        </ul>
      </div>
      
      <div className="about-section">
        <h2>Features</h2>
        <ul className="feature-list">
          <li>Browse a comprehensive list of Pokémon with pagination</li>
          <li>Search for specific Pokémon by name</li>
          <li>View detailed information about each Pokémon including stats, types, and more</li>
          <li>Add and remove Pokémon from your favorites list</li>
          <li>Fully responsive design that works on desktop and mobile devices</li>
        </ul>
      </div>
      
      <div className="about-section">
        <h2>Future Enhancements</h2>
        <ul className="feature-list">
          <li>Filter Pokémon by type, generation, or other attributes</li>
          <li>Compare stats between different Pokémon</li>
          <li>User authentication to save favorites across devices</li>
          <li>Team builder functionality to create balanced Pokémon teams</li>
          <li>Dark mode theme option</li>
        </ul>
      </div>
    </div>
  );
};

export default AboutPage; 