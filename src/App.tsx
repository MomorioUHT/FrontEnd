import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import { Login } from './pages/login';
import { Register } from './pages/register';
import { Users } from './pages/users';
import { Home } from './pages/homepage';
import { AdminDashboard } from './pages/Admindashboard';
import { Editor } from './pages/Editor';
import { CreateProblem } from './pages/CreateProblem';


function App() {
  return (
    <div>
      <Routes>
      <Route path="/" element={<Navigate to="/Login" replace={true} />} />
        <Route path="Home" element={<Home />} />
        <Route path="Register" element={<Register />} />
        <Route path="Login" element={<Login />} />
        <Route path="AdminDashboard" element={<AdminDashboard />} />
        <Route path="AdminDashboard/Users" element={<Users />} />
        <Route path="Editor" element={<Editor />} />
        <Route path="AdminDashboard/CreateProblem" element={<CreateProblem />} />
      </Routes>
    </div>
  );
}

export default App;
