import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://pokeapi.co/api/v2';

// Async thunk for fetching Pokemon list
export const fetchPokemonList = createAsyncThunk(
  'pokemon/fetchPokemonList',
  async (page = 1, { rejectWithValue }) => {
    try {
      const limit = 20;
      const offset = (page - 1) * limit;
      const response = await axios.get(`${API_URL}/pokemon?limit=${limit}&offset=${offset}`);
      return {
        results: response.data.results,
        count: response.data.count,
        page
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for fetching Pokemon details
export const fetchPokemonDetails = createAsyncThunk(
  'pokemon/fetchPokemonDetails',
  async (nameOrId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/pokemon/${nameOrId}`);
      
      // Get species information for description
      const speciesResponse = await axios.get(response.data.species.url);
      
      // Find an English description
      const description = speciesResponse.data.flavor_text_entries.find(
        entry => entry.language.name === 'en'
      )?.flavor_text || 'No description available';
      
      return {
        ...response.data,
        description: description.replace(/[\n\f]/g, ' ') // Clean up formatting
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for searching Pokemon
export const searchPokemon = createAsyncThunk(
  'pokemon/searchPokemon',
  async (searchTerm, { rejectWithValue }) => {
    try {
      // First get all Pokemon (limited to 1000 to keep it reasonable)
      const response = await axios.get(`${API_URL}/pokemon?limit=1000`);
      
      // Filter Pokemon by name that includes the search term
      const filtered = response.data.results.filter(
        pokemon => pokemon.name.includes(searchTerm.toLowerCase())
      );
      
      return {
        results: filtered,
        count: filtered.length,
        page: 1
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  pokemonList: [],
  count: 0,
  currentPage: 1,
  selectedPokemon: null,
  favorites: [],
  loading: false,
  error: null
};

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      // Check if Pokemon is already in favorites to avoid duplicates
      if (!state.favorites.find(pokemon => pokemon.id === action.payload.id)) {
        state.favorites.push(action.payload);
      }
    },
    removeFromFavorites: (state, action) => {
      state.favorites = state.favorites.filter(
        pokemon => pokemon.id !== action.payload.id
      );
    },
    clearSelectedPokemon: (state) => {
      state.selectedPokemon = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Pokemon List
      .addCase(fetchPokemonList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPokemonList.fulfilled, (state, action) => {
        state.loading = false;
        state.pokemonList = action.payload.results;
        state.count = action.payload.count;
        state.currentPage = action.payload.page;
      })
      .addCase(fetchPokemonList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Pokemon Details
      .addCase(fetchPokemonDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPokemonDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedPokemon = action.payload;
      })
      .addCase(fetchPokemonDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Search Pokemon
      .addCase(searchPokemon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchPokemon.fulfilled, (state, action) => {
        state.loading = false;
        state.pokemonList = action.payload.results;
        state.count = action.payload.count;
        state.currentPage = action.payload.page;
      })
      .addCase(searchPokemon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { 
  addToFavorites, 
  removeFromFavorites, 
  clearSelectedPokemon
} = pokemonSlice.actions;

export default pokemonSlice.reducer; 