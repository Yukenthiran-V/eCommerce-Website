import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavabarLogo from '../component/NavbarLogo';
import {config} from "../api/Api";

function Signup(){
    //Fullname  email  phone number date_of_birth gender  password confirm_password  check box agree terms
    const [formData,setFormData]=useState({});
    const [showPassword,setShowPassword]=useState(false);
    const [apiKey,setApiKey]=useState("");
    const base_url=config.base_url;
    const navigate = useNavigate();

    const [errors,setErrors]=useState({
        email:"",
    })
    
    const handleChange=(e)=>{
        const {name,value}=e.target;

       if(name==="firstName" || name==="lastName"){
         const cleanedName = value.replace(/[^a-zA-Z]/g, "");
         // setErrors({fullName:"errors invALID"})
         setFormData((data)=>({...data, [name]: cleanedName}));
       }
       if(name==="email"){
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(emailPattern.test(value)){
            setErrors((prevdata) => ({ ...prevdata, email: "valid" }));    
        }
        else{
            setErrors((prevdata) => ({ ...prevdata, email: "invalid" }));
        }
         setFormData((data) => ({ ...data, [name]: value }));

        }
        else{
         setFormData((data) => ({ ...data, [name]: value }));
        }

    }

    const handleShowPassword=()=>{
        setShowPassword(!showPassword);
    }

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
            console.log("Api key : "+data.result[0].api_key);
    
          }
        } catch (err) {
          console.log(err);
        }
      })();
      
    }, [base_url]);
    
    const handleSave=async(e)=>{
        e.preventDefault();
        const {password,...form}=formData
        const signupData=JSON.stringify(form);
        sessionStorage.setItem("userData",signupData);

try{
        const response = await fetch(base_url+"/signup_user",{
            method:"POST",
            headers:{
                "Authorization":`bearer ${apiKey}`,
                "Content-Type":"application/json"
            },          
            body:JSON.stringify(formData)
        });
        const data =await response.json();
        if(data.message==="success"){
            alert("signUp Sucessfully");
            navigate("/signup/otpverify");
        }
        else if(data.message==="alert"){
            alert("user Already Exists");
        }
        else{
            return alert("error ")
        }
    }
    catch(err){
        console.log("error occured while signup api",err);
    }
    }
    return (
      <>
        <NavabarLogo />
        <div className="container mt-2">
          <div className="row d-flex justify-content-center">
            <div className="col-9 col-md-5">
              <h2 className="text-center">Sign Up</h2>
              <form onSubmit={handleSave}>
                <div className="mb-3">
                  <label for="firstName" class="form-label">
                    First name
                  </label>
                  <input type="text" className="form-control" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} />
                  {/* <div className="invalid-feedback">enter a valid name.   .. </div> */}
                </div>
                <div className="mb-3">
                  <label for="lastName" class="form-label">
                    Last name
                  </label>
                  <input type="text" className="form-control" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} />
                  {/* <div className="invalid-feedback">enter a valid name.   .. </div> */}
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} />
                  <div className="invalid-feedback">{errors?.email}</div>
                </div>

                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    Phone number
                  </label>
                  <input type="text" className="form-control" id="phone" name="phoneNumber" value={formData.phone} onChange={handleChange} />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} />
                </div>
                <div className="text-center mb-3">
                  <button className="btn w-75 w-md-50 " style={{ backgroundColor: "rgb(252, 184, 13)" }} type="submit">
                    Verify your email
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
}

export default Signup;