import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import { MainPage } from './pages/LoginRegister/MainPage';
import { Users } from './pages/Admins/users';
import { Home } from './pages/Others/homepage';
import { Playground } from './pages/Others/Playground';
import { CreateProblem } from './pages/Admins/CreateProblem';
import { Problem1 } from './pages/Others/ProblemPage';
import { Problems } from './pages/Admins/ManageProblems';
import { GlobalChat } from './pages/Others/globalchat';


function App() {
  return (
    <div>
      <Routes>
      <Route path="/" element={<Navigate to="/MainPage" replace={true} />} />
        <Route path="Home" element={<Home />} />
        <Route path="MainPage" element={<MainPage />} />
        <Route path="AdminDashboard" element={<Navigate to="/AdminDashboard/CreateProblem" replace={true} />}/>
        <Route path="AdminDashboard/Users" element={<Users />} />
        <Route path="AdminDashboard/ManageProblems" element={<Problems />} />
        <Route path="Playground" element={<Playground />} />
        <Route path="AdminDashboard/CreateProblem" element={<CreateProblem />} />
        <Route path="task/:id" element={<Problem1 />} />
        <Route path="GlobalChat" element={<GlobalChat />} />
      </Routes>
    </div>
  );
}

export default App;
