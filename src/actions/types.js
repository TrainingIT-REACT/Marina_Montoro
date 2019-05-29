// Definimos la lista de acciones
const actions = [
    // Todos
    "LOGIN_USER",
    "ADD_FAVORITES",
    "DELETE_FAVORITES",
    "SAVE_ALBUMS",
    "SAVE_SONGS",
    "ALBUM_SELECTED",
    "ADD_RECENTLY",
    "PLAY_SONG"
  ];
  
  // Las convertimos en un objeto
  const actionTypes = {};
  actions.forEach(action => {
    actionTypes[action] = action;
  });
  
  export default actionTypes;