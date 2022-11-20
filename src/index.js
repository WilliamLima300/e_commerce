import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';

const container = document.getElementById('root'); //aponta para o compartimento root
const root = createRoot(container); //cria a constante para o compartimento root
root.render(<App tab="home" />); // renderiza na tela

 
