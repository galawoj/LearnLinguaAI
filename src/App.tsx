import "./App.css";
import { TextGenerator } from "./pages/TextGenerator/TextGenerator";
import { AppContextProvider } from "./store/app-context";

function App() {
  return (
    <AppContextProvider>
      <TextGenerator />
    </AppContextProvider>
  );
}

export default App;
