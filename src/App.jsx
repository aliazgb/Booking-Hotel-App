import Header from "./components/Header/Header";
import "./App.css";
import LocationList from "./components/LocationList";
import { Routes, Route } from "react-router-dom";
import LayOut from "./components/AppLayOut/LayOut";
import Hotels from "./components/Hotels/Hotels";
import SingleHotel from "./components/SingleHotel/SingleHotel";
import HotelsProvider from "./Context/HotelsProvider";
import BookMarkProviderList from "./Context/BookMarkProvider"
import Bookmarkk from "./components/Bookmark/Bookmarkk";
import BookMarkList from "./BookMarkList/BookMarkList";
function App() {
  return (
    <BookMarkProviderList>
      <HotelsProvider>
        <Header />
        <Routes>
          <Route path="/" element={<LocationList />} />
          <Route path="/hotels" element={<LayOut />}>
            <Route index element={<Hotels />} />
            <Route path=":id" element={<SingleHotel />} />
          </Route>
          <Route path="/bookmark" element={<Bookmarkk/>}>
            <Route index element={<BookMarkList/>} />
            <Route path="add" element={<div>a two</div>} />
          </Route>
        </Routes>
      </HotelsProvider>
    </BookMarkProviderList>
  );
}

export default App;
