import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import { MainPage } from './pages/LoginRegister/MainPage';
import { ManageUsers } from './pages/Admins/ManageUsers';
import { Home } from './pages/Others/homepage';
import { CreateProblem } from './pages/Admins/CreateProblem';
import { ProblemPage } from './pages/Others/ProblemPage';
import { ManageProblem } from './pages/Admins/ManageProblems';
import { CreateLab } from './pages/Admins/CreateLab';
import { LabPage } from './pages/Others/LabPage';
import { ManageLabs } from './pages/Admins/ManageLab';

function App() {
  return (
    <div>
      <Routes>
      <Route path="/" element={<Navigate to="/MainPage" replace={true} />} />
        <Route path="Home" element={<Home />} />
        <Route path="MainPage" element={<MainPage />} />
        <Route path="AdminDashboard" element={<Navigate to="/AdminDashboard/CreateProblem" replace={true} />}/>
        <Route path="AdminDashboard/Users" element={<ManageUsers />} />
        <Route path="AdminDashboard/ManageProblems" element={<ManageProblem />} />
        <Route path="AdminDashboard/CreateProblem" element={<CreateProblem />} />
        <Route path="AdminDashboard/CreateLab" element={<CreateLab />} />
        <Route path="task/:id" element={<ProblemPage />} />
        <Route path="Lab/:LabName" element={<LabPage />} />
        <Route path="AdminDashboard/ManageLabs" element={<ManageLabs />} />
      </Routes>
    </div>
  );
}

export default App;
