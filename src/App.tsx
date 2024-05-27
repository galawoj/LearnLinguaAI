import "./App.css";
//import { TextGenerator } from "./pages/TextGenerator/TextGenerator";
import { AppContextProvider } from "./store/app-context";

function App() {
  return (
    <AppContextProvider>
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form action="">
        <h3>
          Welcome Back!
          <span>hi</span>
        </h3>
      </form>
    </AppContextProvider>
  );
}

export default App;
