import Header from "./components/Header/Header";
import "./App.css";
import LocationList from "./components/LocationList";
import { Routes, Route } from "react-router-dom";
import LayOut from "./components/AppLayOut/LayOut";
import Hotels from "./components/Hotels/Hotels";
import Toaster from "react-hot-toast";
import HotelsProvider from "./Context/HotelsProvider";

function App() {
  return (
    <HotelsProvider>
      <Toaster />
      <Header />
      <Routes>
        <Route path="/" element={<LocationList />} />
        <Route path="/hotels" element={<LayOut />}>
          <Route index element={<Hotels />} />
          <Route path=":id" element={<div>Single</div>} />
        </Route>
      </Routes>
    </HotelsProvider>
  );
}

export default App;
