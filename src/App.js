import "./App.css";
import Homepage from "./components/Homepage";
import Signup from "./components/Signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProfilePage from "./components/ProfilePage";
import AddLocation from "./components/AddLocation";
import Error404 from "./components/Error404";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Homepage />}></Route>
          <Route path="/users/signup" element={<Signup />}></Route>
          <Route path="/users/profile" element={<ProfilePage />}></Route>
          <Route path="/locations/add" element={<AddLocation />}></Route>
          <Route path="*" element={<Error404 />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
