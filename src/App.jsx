import Header from "./components/Header/Header";
import "./App.css";
import LocationList from "./components/LocationList";
import { Routes,Route } from "react-router-dom";
function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<LocationList/>}/>
      </Routes>
    </div>
  );
}

export default App;
