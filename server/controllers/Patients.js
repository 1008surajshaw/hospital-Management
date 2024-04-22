const Patient = require("../models/Patient");

const User =require("../models/User");

exports.registerPatients  = async (req,res) =>{
    try{
        const userId = req.user.id;
        let {
          firstName,
            lastName,
            contactNumber,
            address,
            description,
            
          } = req.body
          
         
                   

          // if (
          //   !firstName ||
          //   !lastName ||
          //    !address||
          //   !contactNumber ||
          //   !description 
          
          // ) {
          //   return res.status(400).json({
          //     success: false,
          //     message: "All Fields are Mandatory",
          //   })
          // }

          const DoctorDetails = await User.findById(userId, {
            accountType: "Doctor",
          })
      
          if (!DoctorDetails) {
            return res.status(404).json({
              success: false,
              message: "Doctor Details Not Found",
            })
          }
          const newPatients = await Patient.create({
            firstName,
            lastName,
            contactNumber,
            description,
            address
           
          })
          res.status(200).json({
            success: true,
            data: newPatients,
            message: "Patients data added Successfully",
          })
      
          
        
    }
    catch(error){
        console.error(error)
        res.status(500).json({
          success: false,
          message: "Failed to add patients",
          error: error.message,
        })
    }
}


exports.showAllPatients = async (req, res) => {
    try {
        const allPatients = await Patient.find({}); // Corrected model name to Patient

        return res.status(200).json({
            success: true,
            message: "Patients data fetched successfully",
            data: allPatients,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Cannot fetch patients data",
            error: error.message,
        });
    }
};

  
exports.deletePatients = async (req,res) =>{
    try{
     const {id} = req.body;
     const Patients =await Patients.findByIdAndDelete({
        _id:id
     });

    return res.status(200).json({
         success:true,
          message:"patients data Deleted successfully",
          
    })
    }
    catch(error){
      console.log(error);
      return res.status(500).json({
        success:false,
        message:"cannot delete patients data",
        error:error.message,
      })
    }
  
  }
  