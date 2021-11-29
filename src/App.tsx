import React from "react";
import { Routes, Route, HashRouter as Router } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";

import Main from "./pages/Main/Main";

function App() {
  return (
    <Main />
    // <Router>
    //   <Routes>
    //     <Route path="/a/:collectionId" element={<Main />} />
    //     <Route path="/" element={<Main />} />
    //   </Routes>
    // </Router>
  );
}

export default App;
