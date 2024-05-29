import "./App.css";

import Intro from "./pages/Intro/Intro";
//import { TextGenerator } from "./pages/TextGenerator/TextGenerator";
import { AppContextProvider } from "./store/app-context";

function App() {
  return (
    <AppContextProvider>
      <Intro />
    </AppContextProvider>
  );
}

export default App;
