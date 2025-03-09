import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './PokemonCard.css';

const PokemonCard = ({ pokemon, isFavorite, onAddToFavorites, onRemoveFromFavorites }) => {
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If we already have the full data (from favorites), use that
    if (pokemon.sprites) {
      setPokemonData(pokemon);
      setLoading(false);
      return;
    }

    // Otherwise, fetch the data
    const fetchPokemonData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(pokemon.url);
        setPokemonData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Pokemon data:', error);
        setLoading(false);
      }
    };

    fetchPokemonData();
  }, [pokemon]);

  if (loading) {
    return <div className="pokemon-card loading">Loading...</div>;
  }

  if (!pokemonData) {
    return <div className="pokemon-card error">Failed to load Pokemon data</div>;
  }

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      onRemoveFromFavorites(pokemonData);
    } else {
      onAddToFavorites(pokemonData);
    }
  };

  return (
    <div className="pokemon-card">
      <div className="pokemon-image">
        <img 
          src={pokemonData.sprites.other['official-artwork'].front_default || pokemonData.sprites.front_default} 
          alt={pokemonData.name}
        />
      </div>
      <div className="pokemon-info">
        <h3 className="pokemon-name">{pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}</h3>
        <p className="pokemon-types">
          {pokemonData.types.map(type => (
            <span key={type.type.name} className={`type-badge ${type.type.name}`}>
              {type.type.name}
            </span>
          ))}
        </p>
        <div className="pokemon-actions">
          <Link to={`/pokemon/${pokemonData.id}`} className="view-details-btn">
            View Details
          </Link>
          <button 
            onClick={handleFavoriteToggle}
            className={`favorite-btn ${isFavorite ? 'favorited' : ''}`}
          >
            {isFavorite ? '★ Favorited' : '☆ Add to Favorites'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard; 