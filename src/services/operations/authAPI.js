import { toast } from "react-hot-toast"

import { setLoading, setToken } from "../../slices/authSlice"

import { apiConnector } from "../apiconnector"
const BASE_URL ="http://localhost:4000/api/v1"


export function sendotp(email, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST","http://localhost:4000/api/v1/auth/sendotp" , {
        email,
        checkUserPresent: true,
      })
      console.log("SENDOTP API RESPONSE............", response)

      console.log(response.data.success)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("OTP Sent Successfully")
      navigate("/verify-email")
    } catch (error) {
      console.log("SENDOTP API ERROR............", error)
      toast.error("Could Not Send OTP")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function signUp(
  accountType,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  otp,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", "http://localhost:4000/api/v1/auth/signup", {
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
      })

      console.log("SIGNUP API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Signup Successful")
      navigate("/login")
    } catch (error) {
      console.log("SIGNUP API ERROR............", error)
      toast.error("Signup Failed")
      navigate("/signup")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", "http://localhost:4000/api/v1/auth/login", {
        email,
        password,
      })

      console.log("LOGIN API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Login Successful")
      dispatch(setToken(response.data.token))
      const userImage = response.data?.user?.image
        ? response.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
      
      
      localStorage.setItem("token", JSON.stringify(response.data.token))
      localStorage.setItem("user", JSON.stringify(response.data.user))
      navigate("/dashboard/patients")
    } catch (error) {
      console.log("LOGIN API ERROR............", error)
      toast.error("Login Failed")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null))
    
    localStorage.removeItem("token")
    
    toast.success("Logged Out")
    navigate("/")
  }
}

export const getAllPatients = async() =>{
  
  const toastId = toast.loading("loading..")
  let result =[];
  try{
    const response = await apiConnector("GET","http://localhost:4000/api/v1/patients/getAllPatients")
    if(!response?.data?.success){
        throw new Error("Could Not Fetch Course Categories") 
    }
    result = response?.data?.data
  }
  catch(error){
    console.log("GET_ALL_COURSE_API API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
    return result
}


export const AddPatientsDetails = async (formData,token,navigate) =>{
  let result =null
  const toastId = toast.loading("Loading..");
  console.log(formData)
  try{
    const response = await apiConnector("POST","http://localhost:4000/api/v1/patients/registerPatients",formData,
    {    
      Authorization: `${token}`
    }
  )
  console.log("check respo");

  if (!response?.data?.success) {
    throw new Error("Could Not Add Lecture")
     }
     toast.success("Data Added")
     console.log("lol....",response?.data)
     result = response?.data?.data
     navigate("/dashboard/patients")
  }
  catch(error){
    console.log("AddPatientsDetails api error ............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}