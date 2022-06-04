import React from 'react';
import './App.css'
import ToDo from './components /ToDo/todo';
import Header from './components /Header/header';
import Settings from './context/context';
import Auth from './context/Auth';

function App(){
  
    return (
      <>
      <Auth>
      <Settings>
      <Header/>
       <ToDo />
      </Settings>
      </Auth>
      </>
    );
  }
  export default App;
