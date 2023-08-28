import axios from 'axios';

const ADD_FAV = 'ADD_FAV';
const REMOVE_FAV = 'REMOVE_FAV';
const FILTER = 'FILTER';
const ORDER = 'ORDER';

export const addFav = (character) => {
  const endpoint = 'http://localhost:3001/fav';
  return async (dispatch, getState) => {
    try {
      // Verificar si el personaje ya está en la lista de favoritos
      const state = getState();
      const isCharacterInFavorites = state.myFavorites.some(
        (favCharacter) => favCharacter.id === character.id
      );
      if (isCharacterInFavorites) {
        console.log('El personaje ya está en favoritos.');
        return;
      }

      const { data } = await axios.post(endpoint, character);
      if (!data.length) throw Error('No hay favoritos');
      dispatch({
        type: ADD_FAV,
        payload: data,
      });
    } catch (error) {
      console.error(error.message);
    }
  };
};

export const removeFav = (id) => {
  const endpoint = `http://localhost:3001/fav/${id}`;
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(endpoint);
      if (!data.length) throw Error('No hay favoritos');
      dispatch({
        type: REMOVE_FAV,
        payload: data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const filterCards = (gender) => {
  return { type: FILTER, payload: gender };
};

export const orderCards = (order) => {
  return { type: ORDER, payload: order };
};
