import React from "react";
import TabBar from "./components/Tabbar/Tabbar.jsx";
import { Button } from "@mui/material";
import MainRouter from "./Router/MainRouter.jsx";
import MainLayout from "./layouts/MainLayout.jsx";

function App() {
  return (
    <MainLayout>

      <MainRouter/>
    </MainLayout>
  );
}

export default App;
