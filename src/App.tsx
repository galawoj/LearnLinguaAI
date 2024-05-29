import "./App.css";

import Intro from "./pages/Intro/Intro";
import MainApp from "./pages/MainApp/MainApp";
//import { TextGenerator } from "./pages/TextGenerator/TextGenerator";
import { AppContextProvider } from "./store/app-context";

function App() {
  return (
    <AppContextProvider>
      <Intro />
      <MainApp />
    </AppContextProvider>
  );
}

export default App;
