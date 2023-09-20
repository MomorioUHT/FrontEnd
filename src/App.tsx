import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import { Login } from './pages/login';
import { Register } from './pages/register';
import { Users } from './pages/users';
import { Home } from './pages/homepage';
import { AdminDashboard } from './pages/Admindashboard';
import { Editor } from './pages/Editor';


function App() {
  return (
    <div>
      <Routes>
      <Route path="/" element={<Navigate to="/Login" replace={true} />} />
        <Route path="Home" element={<Home />} />
        <Route path="Register" element={<Register />} />
        <Route path="Login" element={<Login />} />
        <Route path="AdminDashboard" element={<AdminDashboard />} />
        <Route path="Users" element={<Users />} />
        <Route path="Editor" element={<Editor />} />
      </Routes>
    </div>
  );
}

export default App;
