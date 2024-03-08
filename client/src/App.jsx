import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login/login.jsx";
import SignUp from "./components/signup/signup.jsx";
import { RequireToken } from './components/Auth/Auth.jsx'
import Dashboard from "./components/dashboard/dashboard.jsx";
import Home from "./components/home.jsx";
import Employee from "./components/employee.jsx";
import Profile from "./components/profile.jsx";
import AddEmployee from "./components/addEmployee/addEmployee.jsx";
import EditEmployee from './components/editEmployee/editEmployee.jsx'


function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          <Route path='/' element={
            <RequireToken>
              <Dashboard />
            </RequireToken>
          }>
            <Route path='/' element={<Home />}></Route>
            <Route path='/employee' element={<Employee />}></Route>
            <Route path='/profile' element={<Profile />}></Route>
            <Route path='/create' element={<AddEmployee />}></Route>
            <Route path='/employeeedit/:id' element={<EditEmployee />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;