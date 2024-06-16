import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  LandingPage,
  Login,
  Register,
  Home,
  Profile,
  CodeRoom,
  Buddies,
  Leaderboard,
  Storage,
} from "./pages";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/sign-up" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/code-room" element={<CodeRoom />} />
        <Route path="/buddies" element={<Buddies />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/storage" element={<Storage />} />
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </Router>
  );
}

export default App;
