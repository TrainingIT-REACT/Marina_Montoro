import types from '../actions/types';

// Estado inicial
const initialState = {
  songs: [],
  recently: [],
  playSong: {id: 0,
            audio: ''}
}

// Implementamos el reducer
const reducer = (state = initialState, action) => {
  switch(action.type) {
    case types.ADD_FAVORITES:
      return {
        ...state,
        songs: [...state.songs, {...action.song}]
      };
      case types.DELETE_FAVORITES:
        return {
          ...state,
          songs: state.songs.filter((song, i) => song.id !== action.song.id)
        };
      case types.ADD_RECENTLY:
        return {
          ...state,
          recently: !state.recently.find((rec) => rec.id === action.song.id) 
            ? [...state.recently, {...action.song}] 
            : state.recently
        };

      case types.PLAY_SONG:
        return {
          ...state,
          playSong: action.song
        };
    default:
      return state;
  }
}

export default reducer;