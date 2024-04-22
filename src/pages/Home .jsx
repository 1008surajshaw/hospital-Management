import {Link, useLocation} from "react-router-dom"

import { useSelector } from 'react-redux'



function Navbar  () {

  const {token} = useSelector((state) =>state.auth);

  const location =useLocation();
  return (
    <>

    
    <div className={`mt-5 relative -translate-y-8 mx-auto flex flex-col w-11/12 items-center max-w-maxContent text-white justify-between `}>
      
        
      
          {token === null && (
            <div>
                Plz sign in or login to your account 
            </div>
          )}


          
          
        </div>
          
     
        
        
    </>
  )
}

export default Navbar