import React from 'react';
import ReactDOM from 'react-dom';

import '@babel/polyfill';
import './index.css';
import App from './App';
import { Provider } from "react-redux";
import * as serviceWorker from './serviceWorker';
// Store
import store from './store';

ReactDOM.render(
  <main>
     <Provider store={store}>
      <App />
    </Provider>

  </main>,
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();
// Instalamos el service worker

let worker;
let refreshing = false;

document.getElementById('reload').addEventListener('click', () => {
  worker.postMessage({action: 'skipWaiting'});
})

// Comprobamos que el navegador lo soporte:
if ('serviceWorker' in navigator) {
  // Esperamos a que cargue la web
  window.addEventListener('load', () => {
  // Intentamos instalar el Service worker
  navigator.serviceWorker.register('/sw.js').then((registration) => {
  // Se ha registrado correctamente
    console.log('El service worker SW se ha registrado correctamente:', registration.scope);

    registration.addEventListener('updatefound', () => {
      worker = registration.installing;

      worker.addEventListener('statechange', () => {
          if(worker.state === 'installed') {
            const updateApp = document.getElementById('updateApplication');
            updateApp.classList.add('show');
          }
      });
    });
    }, (err) => {
    // registration failed :(
    console.log('El registro de SW ha fallado :(', err);
    });

    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if(!refreshing) {
        window.location.reload();
        refreshing = true;
      }
    });
  });
 }
