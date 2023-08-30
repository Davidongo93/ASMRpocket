import axios from 'axios';
import { Dispatch } from 'redux';

// Definición de tipos para las acciones y el estado
export const GET_TRACKS = 'GET_TRACKS';

interface Track {
  title: string;
  audio: string;
}

interface GetTracksAction {
  type: typeof GET_TRACKS;
  payload: Track[];
}

export type ActionTypes = GetTracksAction;

// Acción para obtener las pistas
export const getTracks = () => {
  const endpoint = 'http://localhost:3001/sounds/API';
  return async (dispatch: Dispatch<ActionTypes>) => {
    try {
      const response = await axios.get(endpoint);
      console.log(response);
      dispatch({
        type: GET_TRACKS,
        payload: response.data,
      });
    } catch (error: any) {
      console.error(error.message);
    }
  };
};
