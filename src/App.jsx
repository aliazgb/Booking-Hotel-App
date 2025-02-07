import Header from "./components/Header/Header";
import "./App.css";
import toast, { Toaster } from "react-hot-toast";
import LocationList from "./components/LocationList";
import { Routes, Route } from "react-router-dom";
import LayOut from "./components/AppLayOut/LayOut";
import Hotels from "./components/Hotels/Hotels";
import SingleHotel from "./components/SingleHotel/SingleHotel";
import HotelsProvider from "./Context/HotelsProvider";
import BookMarkProviderList from "./Context/BookMarkProvider";
import Bookmarkk from "./components/Bookmark/Bookmarkk";
import BookMarkList from "./BookMarkList/BookMarkList";
import SingleBookmark from "./components/SingleBookmark/SingleBookmark";
import AddNewBookmark from "./components/AddNewBookmark/AddNewBookmark";
import Login from "./components/Login/Login";
import AuthContextProvider from "./Context/AuthProvider";
import Signup from "./components/Signup/Signup";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
function App() {
  return (
    <AuthContextProvider>
      <BookMarkProviderList>
        <HotelsProvider>
          <Toaster />
          <Header />
          <Routes>
            <Route path="/" element={<LocationList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/hotels"
              element={
                <ProtectedRoute>
                  <LayOut />
                </ProtectedRoute>
              }
            >
              <Route index element={<Hotels />} />
              <Route path=":id" element={<SingleHotel />} />
            </Route>
            <Route
              path="/bookmark"
              element={
                <ProtectedRoute>
                  <Bookmarkk />
                </ProtectedRoute>
              }
            >
              <Route index element={<BookMarkList />} />
              <Route path=":id" element={<SingleBookmark />} />
              <Route path="add" element={<AddNewBookmark />} />
            </Route>
          </Routes>
        </HotelsProvider>
      </BookMarkProviderList>
    </AuthContextProvider>
  );
}

export default App;
