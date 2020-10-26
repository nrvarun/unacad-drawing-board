import DrawingBoard from "./Components/DrawingBoard";
import { CanvasContextProvider } from "./Context/CanvasContext";
import "./scss/main.scss";

function App() {
  return (
    <div className="App">
      <CanvasContextProvider>
        <DrawingBoard />
      </CanvasContextProvider>
    </div>
  );
}

export default App;
