import {Link, useLocation, useNavigate} from "react-router-dom"

import { useDispatch, useSelector } from 'react-redux'
import { VscSignOut } from "react-icons/vsc";
import { logout } from "../services/operations/authAPI";
import { ACCOUNT_TYPE } from "../utils/constants";



function Navbar  () {

  const {token} = useSelector((state) =>state.auth);
  const dispatch = useDispatch();
  const location =useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user)
  return (
    <>

    
    <div className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 ${
      location.pathname !== "/" ? "bg-richblack-800" : ""
    } transition-all duration-200`}>
      <div className={`flex w-11/12 max-w-maxContent items-center justify-between `}>
        
        <Link to={"/"}>
            <h2 className="font-bold font-serif text-yellow-500">Hospital Management</h2>
        </Link>
        
      
          {token === null && (
            <Link to="/login">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                Log in
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                Sign up
              </button>
            </Link>
          )}
          {
            token !== null && (
            <div
            onClick={() => {
              dispatch(logout(navigate));
              
            }}
            className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
          >
            <VscSignOut className="text-lg" />
            Logout
          </div>
            )
          }

          {
            token !== null &&  user.accountType === ACCOUNT_TYPE.DOCTOR && (
              <div className="text-yellow-300 cursor-pointer" onClick={()=>navigate("/dashboard/add")}>
                 Add patients
              </div>
            )
          }
        </div>
          
       
      </div>
        
        
    </>
  )
}

export default Navbar