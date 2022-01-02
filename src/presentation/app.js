import React from "react";
import { Routes, Route } from "react-router-dom";
import { AppContainer } from "./modules";

import { Home } from "./modules/home";
import { Search } from "./modules/search";
import "./app.css";

const App = () => {
  return (
    <div className="App">
      <AppContainer>
        <Routes>
          <Route path="/" caseSensitive={true} element={<Home />} />
          <Route path="/search" caseSensitive={true} element={<Search />} />
        </Routes>
      </AppContainer>
    </div>
  );
};

export default App;
