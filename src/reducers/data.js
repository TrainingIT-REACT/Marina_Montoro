import types from '../actions/types';

// Estado inicial
const initialState = {
  songs: [],
  albums:[],
  albumSelected: false
}

// Implementamos el reducer
const reducer = (state = initialState, action) => {
  switch(action.type) {
    case types.SAVE_ALBUMS:
      return {
        ...state,
        albums: [...state.albums, ...action.albums]
      };
      case types.SAVE_SONGS:
        return {
          ...state,
          songs: [...state.songs, ...action.songs]
        };
        case types.ALBUM_SELECTED:
          return {
            ...state,
            albumSelected: action.albumSelected
          };
    default:
      return state;
  }
}

export default reducer;