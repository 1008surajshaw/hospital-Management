import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

 function OpenRouter({children}){
    const {token} =useSelector((state) =>state.auth)

    if(token ===null){
        return children
    }
    else{
        return <Navigate to={"/dashboard/patients"}/>
    }
}
export default OpenRouter