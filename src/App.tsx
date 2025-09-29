import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./components/StaffLogin";
import Dashboard from "./components/StaffDashboard";
import Home from "./components/Home";
import CourierForm from "./components/CourierForm";
import RegisterForm from "./components/StaffRegister";
import AdminDashboard from "./components/AdminDashboard";
import AdminLogin from "./components/AdminLogin";
import StaffFp from "./components/StaffFp";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path="/staff" element={<LoginForm />} />
        <Route path="/staffDashboard" element={<Dashboard />} />
        <Route path="/staffRegister" element={<RegisterForm />} />
        <Route path="/staffUpdate" element={<StaffFp />} />
        <Route path="/newCourier" element={<CourierForm />} />
      </Routes>
    </Router>
  );
}

export default App;
