import "./App.css";
import { useEffect, useState } from "react";
import Homepage from "./components/Homepage";
import Signup from "./components/Signup";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import ProfilePage from "./components/ProfilePage";
import AddLocation from "./components/AddLocation";
import Error404 from "./components/Error404";
import Explore from "./components/Explore";
import LocationsPage from "./components/LocationsPage";

function App() {
    const [userID, setUserID] = useState("");
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route
                        exact
                        path="/home"
                        element={
                            <Homepage userID={userID} setUserID={setUserID} />
                        }
                    ></Route>
                    <Route
                        path="/home/users/signup"
                        element={
                            <Signup userID={userID} setUserID={setUserID} />
                        }
                    ></Route>
                    <Route
                        path="/home/users/profile"
                        element={
                            <ProfilePage
                                userID={userID}
                                setUserID={setUserID}
                            />
                        }
                    ></Route>
                    <Route
                        path="/home/locations/add"
                        element={
                            <AddLocation
                                userID={userID}
                                setUserID={setUserID}
                            />
                        }
                    ></Route>
                    <Route
                        path="/home/locations/explore"
                        element={
                            <Explore userID={userID} setUserID={setUserID} />
                        }
                    ></Route>
                    <Route
                        path="/home/locations/explore/types/:type"
                        element={
                            <LocationsPage
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
}

export default App;
