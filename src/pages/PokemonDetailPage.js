import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchPokemonDetails, 
  addToFavorites, 
  removeFromFavorites 
} from '../features/pokemon/pokemonSlice';
import './PokemonDetailPage.css';

const PokemonDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { selectedPokemon, loading, error, favorites } = useSelector(state => state.pokemon);
  
  const isFavorite = selectedPokemon && 
    favorites.some(pokemon => pokemon.id === selectedPokemon.id);

  useEffect(() => {
    dispatch(fetchPokemonDetails(id));
  }, [dispatch, id]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(selectedPokemon));
    } else {
      dispatch(addToFavorites(selectedPokemon));
    }
  };

  if (loading) {
    return (
      <div className="pokemon-detail-page">
        <div className="loading-spinner">
          <p>Loading Pokémon details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pokemon-detail-page">
        <div className="error-message">
          <p>Error: {error}</p>
          <button onClick={handleGoBack} className="back-button">Go Back</button>
        </div>
      </div>
    );
  }

  if (!selectedPokemon) {
    return (
      <div className="pokemon-detail-page">
        <div className="error-message">
          <p>Pokémon not found</p>
          <button onClick={handleGoBack} className="back-button">Go Back</button>
        </div>
      </div>
    );
  }

  return (
    <div className="pokemon-detail-page">
      <div className="detail-header">
        <button onClick={handleGoBack} className="back-button">
          ← Back
        </button>
        <h1>{selectedPokemon.name.charAt(0).toUpperCase() + selectedPokemon.name.slice(1)}</h1>
        <p className="pokemon-id">#{selectedPokemon.id}</p>
      </div>

      <div className="pokemon-detail-container">
        <div className="pokemon-image-container">
          <img 
            src={selectedPokemon.sprites.other['official-artwork'].front_default || selectedPokemon.sprites.front_default} 
            alt={selectedPokemon.name}
            className="pokemon-detail-image"
          />
          <div className="pokemon-types detail-types">
            {selectedPokemon.types.map(type => (
              <span key={type.type.name} className={`type-badge ${type.type.name}`}>
                {type.type.name}
              </span>
            ))}
          </div>
        </div>

        <div className="pokemon-info-container">
          <div className="pokemon-description">
            <h2>Description</h2>
            <p>{selectedPokemon.description || 'No description available.'}</p>
          </div>

          <div className="pokemon-stats">
            <h2>Base Stats</h2>
            <div className="stats-grid">
              {selectedPokemon.stats.map(stat => (
                <div key={stat.stat.name} className="stat-item">
                  <div className="stat-name">{formatStatName(stat.stat.name)}</div>
                  <div className="stat-bar-container">
                    <div 
                      className="stat-bar" 
                      style={{ width: `${Math.min(100, (stat.base_stat / 255) * 100)}%` }}
                    >
                      {stat.base_stat}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pokemon-details">
            <h2>Details</h2>
            <div className="details-grid">
              <div className="detail-item">
                <span className="detail-label">Height:</span>
                <span className="detail-value">{(selectedPokemon.height / 10).toFixed(1)} m</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Weight:</span>
                <span className="detail-value">{(selectedPokemon.weight / 10).toFixed(1)} kg</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Abilities:</span>
                <span className="detail-value">
                  {selectedPokemon.abilities
                    .map(ability => 
                      ability.ability.name.replace('-', ' ')
                    )
                    .join(', ')}
                </span>
              </div>
            </div>
          </div>

          <button 
            onClick={handleToggleFavorite}
            className={`favorite-button ${isFavorite ? 'favorited' : ''}`}
          >
            {isFavorite ? '★ Remove from Favorites' : '☆ Add to Favorites'}
          </button>
        </div>
      </div>
    </div>
  );
};

// Helper function to format stat names
const formatStatName = (statName) => {
  switch (statName) {
    case 'hp':
      return 'HP';
    case 'attack':
      return 'Attack';
    case 'defense':
      return 'Defense';
    case 'special-attack':
      return 'Sp. Atk';
    case 'special-defense':
      return 'Sp. Def';
    case 'speed':
      return 'Speed';
    default:
      return statName.replace('-', ' ');
  }
};

export default PokemonDetailPage; 