import { useState } from "react";
import "./App.css";
import { type TogglePages } from "./types/TogglePagesType";
import Form from "./pages/Form/Form";
import Intro from "./pages/Intro/Intro";
import MainApp from "./pages/MainApp/MainApp";

import { AppContextProvider } from "./store/app-context";
import BackgroundShapes from "./components/BackgroundShapes/BackgroundShapes";

function App() {
  const [whichPageOpen, setWhichPageOpen] = useState<TogglePages>("intro");

  function handleChangePage(page: TogglePages) {
    setWhichPageOpen(page);
  }

  return (
    <AppContextProvider>
      {(whichPageOpen === "intro" || whichPageOpen === "form") && (
        <BackgroundShapes />
      )}

      {whichPageOpen === "intro" && (
        <Intro onHandleChangePage={handleChangePage} />
      )}
      {whichPageOpen === "form" && (
        <Form onHandleChangePage={handleChangePage} />
      )}
      {whichPageOpen === "mainApp" && <MainApp />}
    </AppContextProvider>
  );
}

export default App;
