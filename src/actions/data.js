import types from './types';

export const saveAlbums = (albums) => ({
  type: types.SAVE_ALBUMS,
  albums
});

export const saveSongs = (songs) => ({
  type: types.SAVE_SONGS,
  songs
});

export const albumSelected = (albumSelected) => ({
  type: types.ALBUM_SELECTED,
  albumSelected
});