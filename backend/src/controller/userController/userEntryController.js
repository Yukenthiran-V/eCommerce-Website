const nodeMailer=require("nodemailer");
const nodemon = require("nodemon");
const { storeUserData, checkAlreadySigned, saveOtp, userOTPverify, checkLoginUser, checkPassUser, getUserData, updateUserData } = require("./userEntryCommonController");
const { checkAuthentication } = require("../commonController");



async function signupUser(req,res){
  try {
    const api_key = req.headers["authorization"];
    const clearedApi = api_key.split(" ")[1].trim();
    const authentication = await checkAuthentication(clearedApi);
    if (authentication === "valid") {
    const {email}=req.body;
      const checkUser_DB = await checkAlreadySigned(email);
      if(checkUser_DB==="new user"){
       const insert=await storeUserData(req,res);
       if(insert.affectedRows===1){
       
        const result =await sendOtpEmail(req,res);
        if (result === "Email sent successfully") {
          return res.status(200).send({ message: "success", result: result });
        }
       }
      }
      else if(checkUser_DB==="not verified"){
        const update=await updateUserData(req,res);
        if(update.affectedRows===1){
           const result =await sendOtpEmail(req,res);
          if (result === "Email sent successfully") {
          return res.status(200).send({ message: "success", result: result });
        }
        else{
        return res.status(200).send({message:"alert",result:"try again"});
        }

        }
      }
      else{
        return res.status(200).send({message:"alert",result:"user already Exist"})
      }
    } else {
      res.status(400).send({ message: "Error", result: "signup Error" });
    }
  } catch (Error) {
    res.status(401).send({ message: "Error", result: "Not found key" });
  }
}
async function sendOtpEmail(req,res){
     const { firstName, lastName, email } = req.body;
     const fullName = firstName + " " + lastName;
     const reqData = { userName: fullName, userEmail: email };
     const {userName,userEmail}=reqData;
    const  transporter=nodeMailer.createTransport({
        host:"smtp.gmail.com",
        port:587,
        secure:false,
        auth:{
            user:"ukv20031028@gmail.com",
            pass:"dvuv xcgh zfpw rzbu"
        },
        connectionTimeout:10000
    });
    var otp=Math.floor(Math.random()*900000)+100000;
    const mailOptions={
        from:"ukv20031028@gmail.com",
        to:userEmail,
        subject: 'UkCart: Email ID Verification',
        text: `Your one time password code is ${otp}`,
        html:` <p>Dear ${userName},</p>

  <p>Thank you for signing up with us! To complete your registration, please use the OTP (One-Time Password) below:</p>

  <p><strong>OTP: ${otp}</strong></p>

  <p>This OTP is valid for 10 minutes and is required to verify your email address. If you did not request this, please ignore this email.</p>

  <p>Best regards,</p>
  <p>The UKCart Team</p>
`
    }
    try{
        const info=await transporter.sendMail(mailOptions);
        if(info.messageId){
        console.log("Message sent: ",info.messageId);
        const response=await saveOtp(userEmail,otp)
        return "Email sent successfully";
        }
        else{
        return " Error Occured ";   
        }
    }
    catch(error){
         return error;
    }
}


async function otpVerification(req,res){
   const api_key = req.headers["authorization"];
    const clearedApi = api_key.split(" ")[1].trim();
    const authentication = await checkAuthentication(clearedApi);
    if (authentication === "valid") {
   const {email,otp}=req.body;
   const result=await userOTPverify(email,otp);
   if(result==="verified"){
    // update user table  to  otp_verification change pending to  verified 
    // write here....
    res.status(200).send({message:"success",result:result});
   }
   else{
    res.status(400).send({message:"Error", result: result});
   }

    }   
    else{
      res.status(400).send({ message: "invalid key", result: [] });

    }
}

async function loginUser(req,res){
  try{
 const api_key = req.headers["authorization"];
    const clearedApi = api_key.split(" ")[1].trim();
    const authentication = await checkAuthentication(clearedApi);
    if (authentication === "valid") {
   const {email,password}=req.body;
   const data=await checkLoginUser(email);
   
   if(data.length>0){
    const checkPass=await checkPassUser(email,password);
    if(checkPass ==="password match"){
      const getUserInfo=await getUserData(email);
    res.status(200).send({message:"success",result: getUserInfo});
    }
    else{
      res.status(200).send({message:"alert1",result:checkPass});
    }
   }
   else{
    res.status(400).send({message:"alert2", result: data});
   }
    }   
    else{
      res.status(400).send({ message: "invalid key", result: [] });

    }
  }
  catch(err){
    res.status(400).send({message:"Error",result:err})
  }
}
module.exports={sendOtpEmail,signupUser,otpVerification,loginUser};