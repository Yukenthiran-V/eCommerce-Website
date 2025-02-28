const express=require("express");

const  {getAllProducts, getApiKeyByName }  =require("../controller/controller");
const  {sendOtpEmail, signupUser, otpVerification, loginUser}= require("../controller/userController/userEntryController")
const router= express.Router();

router.post("/get_api_key",(req,res)=>{
    getApiKeyByName(req,res)
});

router.post("/get_products",(req,res)=>{
    getAllProducts(req,res);
});

// router.post("/send_otp_email",(req,res)=>{
//     sendOtpEmail(req,res);
// });

router.post("/otp-verify",(req,res)=>{
   otpVerification(req,res);
});

router.post("/signup_user",(req,res)=>{
   signupUser(req,res);
});

router.post("/login_user",(req,res)=>{
    loginUser(req,res);
})

module.exports=router;