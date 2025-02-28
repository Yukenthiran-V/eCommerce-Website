const db = require("../../database/database");
const utils = require("util");

const query = utils.promisify(db.query).bind(db);
async function storeUserData(req,res) {
  try {
    const data=req.body;
    const values=[data.firstName,data.lastName,data.email,data.phoneNumber,data.password]
    const sql ="insert into users (first_name,last_name,email,phone_number,password) values(?,?,?,?,?)"
  
    const result = await db.query(sql,values);
    return result[0];
  } catch (err) {
    console.error(err);
  }
}

async function updateUserData(req,res) {
  try {
    const data=req.body;
    const values=[data.firstName,data.lastName,data.phoneNumber,data.password,data.email]
    const sql ="update users set first_name=?,last_name=?,phone_number=?,password=? where email=?"
  
    const result = await db.query(sql,values);
    return result[0];
  } catch (err) {
    console.error(err);
  }
}
async function checkAlreadySigned(email){
    try{
      const sql = 'select * from users where email=?';
      const values=[email];
      const result=await db.query(sql,values);
      const user=result[0][0];
      if(result[0].length===0){
      return "new user";
      }
      else if(user.otp_verification==="pending"){
       return "not verified";
      }
      else{
      return "already exists";
      }
    }
    catch(err){
        return err;
    }
}

async function saveOtp(email,otp) {
  try{
   const sql="UPDATE USERS SET otp=? where email=?"
   const values =[otp,email];
   const results= await db.query(sql,values);
   if(results.affectedRows>0){
    return results[0];
   }
  }catch(err){
    return err;
  }
}
async function userOTPverify(email,otp){
try{
   const sql ="select * from users where email=? AND otp=?"
   const values=[email,otp];
   const results=await db.query(sql,values);
   if(results[0].length>0){
    
     return "verified";
  }
  else{
    return "invalid otp";
  }
}
catch(err){

}
}

async function checkLoginUser(email){
try{
   const sql ="select * from users where email=?"
   const values=[email];
   const results=await db.query(sql,values);
   if(results[0].length>0){
     return results[0];
  }
  else{
    return "User Not Found";
  }
}
catch(err){
   return err;
}
}


async function checkPassUser(email,password){
try{
   const sql ="select * from users where email=? AND password=?"
   const values=[email,password];
   const results=await db.query(sql,values);
   if(results[0].length>0){
     return "password match";
  }
  else{
    return "password not match";
  }
}
catch(err){
  return err;
}
}



async function getUserData(email){
try{
   const sql ="select * from users where email=? "
   const values=[email];
   const results=await db.query(sql,values);
   if(results[0].length>0){
     return results[0];
  }
  else{
    return "user not found";
  }
}
catch(err){
  return err;
}
}

module.exports={storeUserData, checkAlreadySigned, saveOtp,userOTPverify,checkLoginUser,checkPassUser,getUserData,updateUserData}