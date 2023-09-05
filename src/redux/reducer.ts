import { GET_TRACKS, SELECT_TRACK, ActionTypes } from './actions';

interface Track {
  title: string;
  audio: string;
  image: string;
  category: string;
}

export interface State {
  allTracks: Track[];
  selectedTrack: Track | null;
}

const initialState: State = {
  allTracks: [],
  selectedTrack: null,
};

const reducer = (state: State = initialState, action: ActionTypes): State => {
  switch (action.type) {
    case GET_TRACKS:
      return {
        ...state,
        allTracks: action.payload,
      };
    case SELECT_TRACK:
      return {
        ...state,
        selectedTrack: action.payload, // Almacena la pista seleccionada
      };

    default:
      return state;
  }
};

export default reducer;
