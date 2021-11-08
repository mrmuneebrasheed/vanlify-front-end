import "./App.css";
import { useState } from "react";
import Homepage from "./components/Homepage";
import Signup from "./components/Signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProfilePage from "./components/ProfilePage";
import AddLocation from "./components/AddLocation";
import Error404 from "./components/Error404";
import AddLocation from "./components/AddLocation";

function App() {
<<<<<<< HEAD
    const [userID, setUserID] = useState("");
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route
                        exact
                        path="/"
                        element={
                            <Homepage userID={userID} setUserID={setUserID} />
                        }
                    ></Route>
                    <Route
                        path="/users/signup"
                        element={
                            <Signup userID={userID} setUserID={setUserID} />
                        }
                    ></Route>
                    <Route
                        path="/users/profile"
                        element={
                            <ProfilePage
                                userID={userID}
                                setUserID={setUserID}
                            />
                        }
                    ></Route>
                    <Route
                        path="/locations/add"
                        element={
                            <AddLocation
                                userID={userID}
                                setUserID={setUserID}
                            />
                        }
                    ></Route>
                    <Route path="*" element={<Error404 />}></Route>
                </Routes>
            </div>
        </BrowserRouter>
    );
=======
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
>>>>>>> a2b40204b4da030332a50d0820865546855854fe
}

export default App;
