import React from "react";
import TabBar from "./components/Tabbar/Tabbar.jsx";
import { Button } from "@mui/material";

function App() {
  return (
    <div className="App">
      <h1 className="bg-red-500">Mon Application</h1>
      <TabBar />
      <Button>hello button</Button>
    </div>
  );
}

export default App;
