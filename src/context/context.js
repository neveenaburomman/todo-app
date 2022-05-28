import React, { useState ,useEffect } from 'react';

export const SettingsContext = React.createContext();


export default function SettingsProvider(props) {

  const [showCompletedItems, setShowCompletedItems] = useState(false);
  const [number, setNumber] = useState(5);
  const [sort,setSort] =useState(1)
  const state = { showCompletedItems, setShowCompletedItems, number, setNumber ,sort ,setSort };

  useEffect(()=>{
    let data = JSON.parse(localStorage.getItem("settings"));
    if(data){
      setShowCompletedItems(data.showCompletedItems);
      setNumber(data.number);
         setSort(data.sort);
    }
   
},[])

  return (
    <SettingsContext.Provider value={state}>
      {props.children}
    </SettingsContext.Provider>
  );
}

