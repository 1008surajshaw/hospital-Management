import {Link, useLocation} from "react-router-dom"

import { useSelector } from 'react-redux'



function Navbar  () {

  const {token} = useSelector((state) =>state.auth);

  const location =useLocation();
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
        </div>
          
       
      </div>
        
        
    </>
  )
}

export default Navbar