// Import the Mongoose library
const mongoose = require("mongoose");

// Define the user schema using the Mongoose Schema constructor
const PatientSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
			trim: true,
		},
		lastName: {
			type: String,
			required: true,
			trim: true,
		},
		
        
        contactNumber:{
            type:Number,
            required:true
        },
        address:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        },
		active: {
			type: Boolean,
			default: true,
		},
        createdAt: {
		     type:Date,
		    default:Date.now,
	},
		
		
		
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Patient", PatientSchema);