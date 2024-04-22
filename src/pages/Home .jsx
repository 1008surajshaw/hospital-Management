import {Link, useLocation, useNavigate} from "react-router-dom"

import { useSelector } from 'react-redux'



function Navbar  () {

  const {token} = useSelector((state) =>state.auth);

  const location =useLocation();
  const navigate  = useNavigate();
  return (
    <>

    
    <div className={`mt-5 relative -translate-y-8 mx-auto flex flex-col w-11/12 items-center max-w-maxContent text-white justify-between `}>
      
        
      
          {token === null && (
            <div className="flex flex-row my-auto mx-auto fort-bold text-5xl mt-[200px] cursor-pointer">
                Plz sign in or login to your account 
            </div>
          )}
          {
            token !==null && (
              <div className="flex flex-row my-auto mx-auto fort-bold text-5xl mt-[200px] cursor-pointer" onClick={() =>navigate('/dashboard/patients')}>
                 Go to dash board
              </div>
            )
          }

          
          
        </div>
          
     
        
        
    </>
  )
}

export default Navbar