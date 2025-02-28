import React, { useEffect, useRef, useState } from 'react';
import NavbarLogo from '../component/NavbarLogo';
import {config} from "../api/Api";

// component definition 
function OtpVerify(){

    const [time,setTime]=useState(150);
    const [otp,setOtp]=useState(new Array(6).fill(""));
    const [apiKey,setApiKey]=useState("");

    const base_url=config.base_url;

    const [userData,setUserData]=useState(null);

    const  inputRef =useRef([]);

     useEffect(() => {
     (async function(){
        try {
          const reqData = { secret_key: "yukenthiran@soft.com", name: "uk" };
          const response = await fetch(`${base_url}/get_api_key`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(reqData),
          });
          const data = await response.json();
          if (data.message==="success") {
            setApiKey(data.result[0].api_key);    
          }
        } catch (err) {
          console.log(err);
        }
      })();
      
    }, [base_url]);
    
    const handleChange =(value,index)=>{
      debugger
        if(!isNaN(value)){
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
            if(value && index<5){
                inputRef.current[index+1].focus();
            }
        }
    };
  

    const handleBackSpace=(value,index)=>{
      debugger
     if(value === "" && index > 0){
        inputRef.current[index-1].focus();
     }
    }
    useEffect(()=>{
      const userInfo=sessionStorage.getItem("userData");
      if(userInfo){
        const user=JSON.parse(userInfo);
        setUserData(user);
        }
    },[]);
    const handleSubmit=async(e)=>{
      debugger;
      e.preventDefault();
        const otpValue = otp.join("");
        if(otpValue.length===6){
           const response=await  fetch(`${base_url}/otp-verify`,{
              method:"POST",
              headers:{
                "Authorization":"Bearer "+apiKey,
                "Content-Type":"application/json",
                },
              body:JSON.stringify({email:userData.email,otp:otpValue})
            });
            if(response.ok){
            const data =await response.json();
            if(data.message==="success"){
              if(data.result==="verified"){
              window.location.href="/login";
              }
              else{
                alert("try again");
              }
            }
            }
            else{
              alert("try again");
            }
        }
        else{
            alert("Please enter  6 digit otp");
        }
    }


  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => {

      if(prevTime<=0){
          clearInterval(timer);
        return 0;
      }
      return prevTime-1;
    },1000);
    }, [1000]);
    return () => clearInterval(timer);
  },[time]);
  const formatTime=()=>{
    const  minutes= Math.floor(time/60);
    const seconds=time%60;
    return `${minutes}:${seconds<10?`0${seconds}`:seconds}`
  }

return (
  <>
    <NavbarLogo />
    <div class="container mt-5 ">
      <div class="row d-flex justify-content-center ">
        <div className="col-10 col-md-5 ">
          <div className=' p-5' style={{borderRadius:"5px",border:"1px solid grey"}}>
            <h3 className="text-center mb-3">OTP Verification</h3>
            <p>
              One Time Password (OTP) has been sent via Email to <b>yuke@gmail.com.</b>
            </p>
            <p>Enter the OTP below to verify it.</p>
            <form onSubmit={handleSubmit}>
              <div className="mb-4 d-flex justify-content-center gap-1">
                {otp.map((data, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    value={data}
                    onChange={(e) => {
                      handleChange(e.target.value, index);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Backspace") {
                        handleBackSpace(e.target.value, index);
                      }
                    }}
                    ref={(el) => {
                      inputRef.current[index] = el;
                    }}
                    className="form-control text-center otp-input"
                    style={{
                      width: "15%",
                      height: "10%",
                      fontSize: "16px",
                      border: "1px solid #ced4da"
                    }}
                  />
                ))}
              </div>
              <div className="d-flex justify-content-center mb-3">{time ===0 ? <button className="btn text-primary" style={{textDecoration:"underline"}} onClick={() => setTime(150)}> Resend OTP</button> : <p>Time Remaining : {formatTime()}</p>}</div>
              <div className="text-center">
                <button className="btn w-50 w-md-50 " style={{ backgroundColor: "rgb(252, 184, 13)" }} type="submit">
                  Verify OTP
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </>
);
}
export default OtpVerify;