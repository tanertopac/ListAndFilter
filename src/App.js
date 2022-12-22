import React from "react";

import Router from "./router";

import "./App.css";

const initialState = {};

function App() {
  const FilterContext = React.createContext();

  return (
    <FilterContext.Provider value={initialState}>
      <div className="App">
        <Router />
      </div>
    </FilterContext.Provider>
  );
}

export default App;
