import axios from 'axios';
import { Dispatch } from 'redux';

// Definición de tipos para las acciones y el estado
export const GET_TRACKS = 'GET_TRACKS';
export const SELECT_TRACK = 'SELECT_TRACK';

interface Track {
  title: string;
  audio: string;
  image: string;
  category: string;
}

interface GetTracksAction {
  type: typeof GET_TRACKS;
  payload: Track[];
}

interface SelectTrackAction {
  type: typeof SELECT_TRACK;
  payload: Track | null; // Pista seleccionada
}

export type ActionTypes = GetTracksAction | SelectTrackAction;

// Acción para obtener las pistas
export const getTracks = () => {
  const endpoint = 'http://192.168.0.199:3001/sounds/asmr';
  return async (dispatch: Dispatch<ActionTypes>) => {
    try {
      const response = await axios.get(endpoint);
      dispatch({
        type: GET_TRACKS,
        payload: response.data,
      });
    } catch (error: any) {
      console.error(error.message);
    }
  };
};

export const selectTrack = (track: Track | null): SelectTrackAction => ({
  type: SELECT_TRACK,
  payload: track,
});
