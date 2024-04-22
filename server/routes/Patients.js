const express =require("express");
const router =express.Router()
const { auth, isDoctor  } = require("../middlewares/auth");
const { registerPatients, deletePatients, showAllPatients } = require("../controllers/Patients");

// ********************************************************************************************************
//                                       routes
// ********************************************************************************************************


router.post("/registerPatients",auth,isDoctor,registerPatients)

router.get("/getAllPatients",  showAllPatients)

router.delete("/deletePatientsData", deletePatients)


module.exports = router