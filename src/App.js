import { Route, Routes } from "react-router-dom";
import GameV1 from "./components/tictactoeV1/GameV1";
import GameV2 from "./components/tictactoeV2/GameV2";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<GameV2 />}></Route>
        <Route path="/v2" element={<GameV1 />}></Route>
      </Routes>
    </>
  );
}

export default App;
