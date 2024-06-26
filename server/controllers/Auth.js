const User =require("../models/User");
const OTP =require("../models/OTP");
const otpGenerator =require("otp-generator");

const bcrypt =require("bcrypt");
const jwt =require("jsonwebtoken");
require("dotenv").config();
const mailSender =require("../utils/mailSender");


//otp 


exports.sendotp =async (req,res) =>{
   try{
    const { email } =req.body;
    const cheackUserPresent =await User.findOne({ email });

    if(cheackUserPresent){
        return res.status(401).json({
            sucsess:false,
            message:'user already registered'
        })
    }

    var otp =otpGenerator.generate(6,{
        upperCaseAlphabets:false,
        lowerCaseAlphabets:false,
        specialChars:false,
    });

    console.log("OTP generator:",otp);

    //check unique otp or not

    let result =await OTP.findOne({ otp:otp });
    console.log("Result is Generate OTP Func");
	console.log("OTP", otp);
	console.log("Result", result);
    while(result){
        otp =otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        });
    //    result =await OTP.findOne({otp:otp});
 
    }

     const otpPayload ={ email,otp };
     const otpBody =await OTP.create(otpPayload);
     console.log(otpBody);

     res.status(200).json({
        success:true,
        messaga:"otp sent successfully",
        otp,
     })


   }
   catch(error){
   console.log(error);
   console.log("come in catch bolock in sendotp ");
    return res.status(500).json({
    success:false,
    message:error.message,
    
})
   }
}



exports.signup =async (req,res) =>{

    
  try{
    const {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        accountType,
        otp,

    } =req.body;

    

    if(!firstName || !lastName || !password || !confirmPassword || !email || !otp){
        return res.status(403).json({
            success:false,
            message:"all fields are required",
        });

    }
    
    if(password !==confirmPassword){
        return res.status(400).json({
    success:false,
    message:"password and confirm password value are not same"
});
}

   
    const existingUser =await User.findOne({ email });
    if(existingUser){
        return res.status(400).json({
            success:false,
            message:'user is already register',
        });
    }
    console.log(email)
    //find most resent otp stored for the user
    const response =await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
    console.log(response);
    
    if(response.length === 0){
        return res.status(400).json({
            success:false,
            message:"otp not found",
        })
    }
    else if(otp !== response[0].otp){
        return res.status(400).json({
            success:false,
            messaga:"invalid otp",
        })
    }
    

    const hashedPassword =await bcrypt.hash(password,10);
   
    
    const user =await User.create({
        firstName,
        lastName,
        email,
        password:hashedPassword,
        accountType,
       
        image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    })
    
    return res.status(200).json({
        success:true,
        message:'user is register successfully',
        user,
    })
  }
  catch(error){
    console.log(error);
    return res.status(500).json({
        success:false,
        messaga:'user cannot registered. sign in me catch me aa gya'
    })
  }
}

//changepassword


//log in

exports.login =async (req,res)=>{
    try{
    //get data from req body

    const { email,password }=req.body;
    //validition data
    if(!email || !password){
        return res.status(400).json({
            success:false,
            message:'all fields are required,please try again'
        });
    }
    
    const user =await User.findOne({ email });
    // console.log(user);
   //  console.log(USER);
    if(!user){
     return res.status(401).json({
        success:false,  
        message:"plzz sign  in first",
    });
}

   if(await bcrypt.compare(password,user.password)) {
   
    const token =jwt.sign(
        { email: user.email, id: user._id, accountType: user.accountType },
        process.env.JWT_SECRET,
        {
        expiresIn:"24h",
    });


    user.token =token;
   
    user.password =undefined;



  const options ={
    expires: new Date(Date.now()+3 * 24 * 60 * 60 * 1000),
    httpOnly:true,
  }
    res.cookie("token",token,options).status(200).json({
        success:true,
        token,
        user,
        messaga:'loged in successfully'
    });

   }
   else{
    return res.status(401).json({
        success:false,
        message:'password is incorrect',
    });
   }

    }
    catch(error){
     console.log(error)
     return res.status(500).json({
        success:false,
        message:'login failure, come in catch block in log in time'
     })
    }
}

// change password 

