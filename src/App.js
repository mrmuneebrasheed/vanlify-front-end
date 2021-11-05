import "./App.css";
import Homepage from "./components/Homepage";
import Signup from "./components/Signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route exact path="/" element={<Homepage />}></Route>
                    <Route path="/users/signup" element={<Signup />}></Route>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
