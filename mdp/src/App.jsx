import React from "react";
import TabBar from "./components/Tabbar/Tabbar.jsx";
import { Button } from "@mui/material";
import MainRouter from "./Router/MainRouter.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import { StorageProvider } from "./services/StorageContext.jsx";

function App() {
  return (
    <StorageProvider>
      <MainLayout>
        <MainRouter/>
      </MainLayout>
    </StorageProvider>
  );
}

export default App;
