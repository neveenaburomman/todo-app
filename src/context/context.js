import React, { useState } from 'react';

export const SettingsContext = React.createContext();


 function settingsContext(props) {
  const [show, setShow] = useState(true);
  const [item, setItem] = useState(4);
  const [sort, setSort] = useState('');

  const state = { show, setShow, item, setItem, sort, setSort,};

  return (
    <SettingsContext.Provider value={state}>
      {props.children}
    </SettingsContext.Provider>
  );
}

export default settingsContext