import { GET_TRACKS, ActionTypes } from './actions';

interface Track {
  title: string;
  audio: string;
}

export interface State {
  allTracks: Track[];
}

const initialState: State = {
  allTracks: [],
};

const reducer = (state: State = initialState, action: ActionTypes): State => {
  switch (action.type) {
    case GET_TRACKS:
      return {
        ...state,
        allTracks: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
