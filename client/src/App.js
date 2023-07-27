import {BrowserRouter,Routes,Route} from "react-router-dom";
import './App.css';
import Navbar from "./components/common/Navbar";
import Landing from "./components/common/Landing";

function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Landing/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
