import Header from "./components/Header/Header";
import "./App.css";
import LocationList from "./components/LocationList";
import { Routes, Route } from "react-router-dom";
import LayOut from "./components/AppLayOut/LayOut";
import Hotels from "./components/Hotels/Hotels";
import Toaster from "react-hot-toast";
import SingleHotel from "./components/SingleHotel/SingleHotel";
import HotelsProvider from "./Context/HotelsProvider";
import BookMarkProvider from "./BookMark/BookMark";
import BookMark from "./BookMark/BookMark";
function App() {
  return (
    <BookMarkProvider>
    <HotelsProvider>
      <Header />
      <Routes>
        <Route path="/" element={<LocationList />} />
        <Route path="/hotels" element={<LayOut />}>
          <Route index element={<Hotels />} />
          <Route path=":id" element={<SingleHotel />} />
        </Route>
        <Route path="/bookmark" element={<BookMark/>}>
          <Route index element={<div>a one</div>}/>
          <Route path="add" element={<div>a two</div>}/>
        </Route>
      </Routes>
    </HotelsProvider>
    </BookMarkProvider>
  );
}

export default App;
