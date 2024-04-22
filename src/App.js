import "./App.css";
import Navbar from "./components/Navbar";
import { Route,Routes, useNavigate } from "react-router-dom";
import OpenRouter from "./components/Auth/OpenRouter"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Error from "./pages/Error"
import Home from "./pages/Home "
import VerifyEmail from "./pages/VerifyEmail"
import Dashboard from "./pages/Dashboard";
import Form from "./components/Form"

function App() {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>} />
     
      <Route
          path="signup"
          element={
            <OpenRouter>
              <Signup />
            </OpenRouter>
          }
        />
    <Route
          path="login"
          element={
            <OpenRouter>
              <Login />
            </OpenRouter>
          }
        />

    

      <Route
          path="verify-email"
          element={
            <OpenRouter>
              <VerifyEmail />
            </OpenRouter>
          }
        />  

    
      <Route path="dashboard/patients" element={<Dashboard />} />
      <Route path="dashboard/add"  element={<Form/>}/>
      {/* {
        user?.accountType === ACCOUNT_TYPE.Doctor && (
          <>
          <Route path="dashboard/addpatients" element={<AddPatients />} />
          </>
        )
      } */}

    
   
      <Route path="*" element={<Error />} />


    </Routes>

   </div>
  );
}

export default App;
