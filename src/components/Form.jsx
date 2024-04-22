import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import IconBtn from "./IconBtn";
import { AddPatientsDetails } from '../services/operations/authAPI';
import { useNavigate } from 'react-router-dom';

export default function CourseInformationForm() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { token } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            console.log("Form data:", data); 
            const result = await AddPatientsDetails(data, token,navigate);
            console.log("API response:", result); // Check the API response
            setLoading(false);
        } catch (error) {
            console.error('Error adding patient details:', error);
            setLoading(false);
        }
    };
 
  return (
    <form
    onSubmit={handleSubmit(onSubmit)}
    className='space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6'
 >
     <div className='flex flex-col space-y-2'>
        <label className='text-sm text-richblack-5' htmlFor='firstName'>
        First Name <sup className='text-pink-200'>*</sup>
        </label>
        <input
         id='firstName'
         placeholder='Enter First Name'
         className='form-style'
         {...register("firstName",{required: true})}
        />
        {
         errors.firstName && (
             <span className='ml-2 text-xs tracking-wide text-pink-200'>
             First name is required
             </span>
         )
        }
      </div>
 
      <div className='flex flex-col space-y-2'>
        <label className='text-sm text-richblack-5' htmlFor='lastName'>
        Last Name <sup className='text-pink-200'>*</sup>
        </label>
        <input
         id='lastName'
         placeholder='Enter Last Name'
         className='form-style'
         {...register("lastName",{required: true})}
        />
        {
         errors.lastName && (
             <span className='ml-2 text-xs tracking-wide text-pink-200'>
             Last name is required
             </span>
         )
        }
      </div>
 
      <div className='flex flex-col space-y-2'>
        <textarea 
         id="description"
         placeholder="Enter Description"
         {...register("description", { required: true })}
         className="form-style resize-x-none min-h-[130px] w-full"
        />
        {
         errors.description && (
             <span className='ml-2 text-xs tracking-wide text-pink-200'>
                Description is required
             </span>
         )
        }
      </div>
 
      <div className='flex flex-col space-y-2'>
         <label className='text-sm text-richblack-5' htmlFor='contactNumber'>
            Contact Number <sup className="text-pink-200">*</sup> 
         </label>
         <div className='relative'>
             <input 
                 id='contactNumber'
                 placeholder='Enter Contact Number'
                 {...register("contactNumber",{
                     required:true,
                     valueAsNumber:true,
                     pattern :{
                         value: /^(0|[1-9]\d*)(\.\d+)?$/,
                     }
                 })}
                 className='form-style w-full !pl-12'
             />
         </div>
         {errors.contactNumber && (
           <span className="ml-2 text-xs tracking-wide text-pink-200">
             Contact Number is required
           </span>
         )}
       </div>
 
       <div className='flex flex-col space-y-2'>
        <label className='text-sm text-richblack-5' htmlFor='address'>
         Address <sup className='text-pink-200'>*</sup>
        </label>
        <input
         id='address'
         placeholder='Enter Address'
         className='form-style'
         {...register("address",{required: true})}
        />
        {
         errors.address && (
             <span className='ml-2 text-xs tracking-wide text-pink-200'>
             Address is required
             </span>
         )
        }
      </div>
      
     <div className='flex justify-end gap-x-2'>
         <IconBtn 
           disabled={loading}
           text={"Add"}
         />
     </div>
 </form>
 
  )
}
