import types from './types';

export const addFavorites = (song) => ({
  type: types.ADD_FAVORITES,
  song
});

export const deleteFavorites = (song) => ({
  type: types.DELETE_FAVORITES,
  song
});

export const addRecently = (song) => ({
  type: types.ADD_RECENTLY,
  song
});

export const playSong = (song) => ({
  type: types.PLAY_SONG,
  song
});