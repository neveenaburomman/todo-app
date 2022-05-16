import React from 'react';
import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import ToDo from './components /ToDo/todo';
import Header from './components /Header/header';

function App(){
  
    return (
      <>
       <Header/>
       <ToDo />
      </>
    );
  }
  export default App;
