import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PokemonCard from './PokemonCard';
import { addToFavorites, removeFromFavorites } from '../../features/pokemon/pokemonSlice';
import './PokemonList.css';

const PokemonList = ({ pokemonList }) => {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.pokemon.favorites);

  const handleAddToFavorites = (pokemon) => {
    dispatch(addToFavorites(pokemon));
  };

  const handleRemoveFromFavorites = (pokemon) => {
    dispatch(removeFromFavorites(pokemon));
  };

  if (!pokemonList || pokemonList.length === 0) {
    return (
      <div className="empty-state">
        <p>No Pokémon found. Try adjusting your search.</p>
      </div>
    );
  }

  return (
    <div className="pokemon-list">
      {pokemonList.map(pokemon => {
        const isFavorite = favorites.some(fav => {
          // Check if it's a favorite by id or name
          if (fav.id && pokemon.id) {
            return fav.id === pokemon.id;
          } else if (fav.name && pokemon.name) {
            return fav.name === pokemon.name;
          } else if (fav.url && pokemon.url) {
            return fav.url === pokemon.url;
          }
          return false;
        });

        return (
          <PokemonCard
            key={pokemon.name || pokemon.id}
            pokemon={pokemon}
            isFavorite={isFavorite}
            onAddToFavorites={handleAddToFavorites}
            onRemoveFromFavorites={handleRemoveFromFavorites}
          />
        );
      })}
    </div>
  );
};

export default PokemonList; 