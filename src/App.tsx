import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import { MainPage } from './pages/LoginRegister/MainPage';
import { Users } from './pages/Admins/users';
import { Home } from './pages/homepage';
import { Playground } from './pages/Playground';
import { CreateProblem } from './pages/Admins/CreateProblem';
import { Problem1 } from './pages/PythonPage';
import { PythonProblems } from './pages/Admins/ManagePython';


function App() {
  return (
    <div>
      <Routes>
      <Route path="/" element={<Navigate to="/MainPage" replace={true} />} />
        <Route path="Home" element={<Home />} />
        <Route path="MainPage" element={<MainPage />} />
        <Route path="AdminDashboard" element={<Navigate to="/AdminDashboard/CreateProblem" replace={true} />}/>
        <Route path="AdminDashboard/Users" element={<Users />} />
        <Route path="AdminDashboard/PythonProblems" element={<PythonProblems />} />
        <Route path="Playground" element={<Playground />} />
        <Route path="AdminDashboard/CreateProblem" element={<CreateProblem />} />
        <Route path="Python/:id" element={<Problem1 />} />
      </Routes>
    </div>
  );
}

export default App;
