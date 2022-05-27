import React, { useState } from 'react';

export const SettingsContext = React.createContext();


export default function SettingsProvider(props) {

  const [showCompletedItems, setShowCompletedItems] = useState(false);
  const [item, setItem] = useState(5);

  const state = { showCompletedItems, setShowCompletedItems, item, setItem};


  return (
    <SettingsContext.Provider value={state}>
      {props.children}
    </SettingsContext.Provider>
  );
}

