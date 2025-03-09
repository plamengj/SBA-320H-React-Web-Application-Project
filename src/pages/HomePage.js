import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPokemonList } from '../features/pokemon/pokemonSlice';
import SearchBar from '../components/pokemon/SearchBar';
import PokemonList from '../components/pokemon/PokemonList';
import Pagination from '../components/pokemon/Pagination';
import './HomePage.css';

const HomePage = () => {
  const dispatch = useDispatch();
  const { pokemonList, count, currentPage, loading, error } = useSelector(state => state.pokemon);

  useEffect(() => {
    dispatch(fetchPokemonList(currentPage));
  }, [dispatch, currentPage]);

  const handlePageChange = (page) => {
    dispatch(fetchPokemonList(page));
  };

  return (
    <div className="home-page">
      <section className="hero">
        <h1>Welcome to PokéExplorer!</h1>
        <p>Your ultimate guide to the world of Pokémon</p>
        <SearchBar />
      </section>

      <section className="pokemon-section">
        <h2>Browse Pokémon</h2>
        
        {error && (
          <div className="error-message">
            <p>Error: {error}</p>
          </div>
        )}
        
        {loading ? (
          <div className="loading-spinner">
            <p>Loading Pokémon...</p>
          </div>
        ) : (
          <>
            <PokemonList pokemonList={pokemonList} />
            <Pagination 
              currentPage={currentPage}
              totalItems={count}
              itemsPerPage={20}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </section>
    </div>
  );
};

export default HomePage; 