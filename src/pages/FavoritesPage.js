import React from 'react';
import { useSelector } from 'react-redux';
import PokemonList from '../components/pokemon/PokemonList';
import './FavoritesPage.css';

const FavoritesPage = () => {
  const { favorites } = useSelector(state => state.pokemon);

  return (
    <div className="favorites-page">
      <h1>My Favorite Pokémon</h1>
      
      {favorites.length === 0 ? (
        <div className="empty-favorites">
          <p>You haven't added any Pokémon to your favorites yet.</p>
          <p>Browse the Pokémon collection and click "Add to Favorites" on the ones you like!</p>
        </div>
      ) : (
        <>
          <p className="favorites-count">You have {favorites.length} favorite Pokémon</p>
          <PokemonList pokemonList={favorites} />
        </>
      )}
    </div>
  );
};

export default FavoritesPage; 