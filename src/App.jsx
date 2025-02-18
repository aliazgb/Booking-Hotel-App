import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AuthContextProvider from "./Context/AuthProvider";
import BookMarkProviderList from "./Context/BookMarkProvider";
import HotelsProvider from "./Context/HotelsProvider";
import AddNewBookmark from "./components/AddNewBookmark/AddNewBookmark";
import LayOut from "./components/AppLayOut/LayOut";
import BookMarkList from "./components/BookMarkList/BookMarkList";
import Bookmarkk from "./components/Bookmark/Bookmarkk";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Hotels from "./components/Hotels/Hotels";
import LocationList from "./components/LocationList/LocationList";
import Login from "./components/Login/Login";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Signup from "./components/Signup/Signup";
import SingleBookmark from "./components/SingleBookmark/SingleBookmark";
import SingleHotel from "./components/SingleHotel/SingleHotel";
function App() {
  return (
    <AuthContextProvider>
      <BookMarkProviderList>
        <HotelsProvider>
          <Toaster />
          <Header />
          <Routes>
            <Route path="/">
              <Route
                index
                element={
                  <>
                    <LocationList /> <Footer />
                  </>
                }
              />
            </Route>
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
