import "./App.css";
import Form from "./pages/Form/Form";

import Intro from "./pages/Intro/Intro";
import MainApp from "./pages/MainApp/MainApp";
//import { TextGenerator } from "./pages/TextGenerator/TextGenerator";
import { AppContextProvider } from "./store/app-context";

function App() {
  return (
    <AppContextProvider>
      {/* <Intro /> */}
      <Form />
      {/* <MainApp /> */}
    </AppContextProvider>
  );
}

export default App;
