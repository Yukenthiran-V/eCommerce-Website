import  { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavabarLogo from '../component/NavbarLogo';
import {config} from "../api/Api";
import Cookies from 'js-cookie';


function Login(){

    const [apiKey,setApiKey]=useState("");
    const [loginData,setLoginData]=useState({});
    const navigate=useNavigate();
    const base_url=config.base_url;


    const handleChange=(e)=>{
        const {name,value}=e.target;
        setLoginData((prevdata)=>({...prevdata,[name]:value}));
    }

      
          const reqData = { secret_key: "yukenthiran@soft.com", name: "uk" }
          const getApi = async()=>{
            try {
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
          }
          useEffect(()=>{
          if(reqData){
           getApi();
           }          
      },[])
        
    const  HandleLogin=async(e)=>{
        e.preventDefault();
        const loginInfo={
            email:loginData.email,
            password:loginData.password
        };
        const response =await fetch(base_url+"/login_user",{
            method:"POST",
            headers:{
                "Authorization":`Bearer ${apiKey}`,
                "Content-Type":"application/json"
            },
            body:JSON.stringify(loginInfo)
        });
        const data =await response.json();
        if(data.message==="success"){
            const userData=data.result[0];
            const  {password,...filter}=userData;
            const convertJSON=JSON.stringify(filter);
            Cookies.set("userData",convertJSON);
           navigate("/");            
        }
        else if(data.message==="alert1"){
// user Not found
            alert(data.result);
         
        }     
        else if(data.message==="alert2"){
            //password not matching 
            alert(data.result);

        }
    }
    return (
        <>
        <NavabarLogo />
        <div className='container mt-5'>
         <div className='row   d-flex justify-content-center'>
            <div className='col-md-4 p-3 rounded-4 border'>
                <h2 className="text-center">Login</h2>
                <form onSubmit={HandleLogin} >
                <div className='mb-3'>
                    <label htmlFor="email" className='form-label'>Email</label>
                    <input 
                    type="email"
                    name="email"
                    id="email"
                    placeholder=""
                    autoComplete='off' 
                    className="form-control"
                    value={loginData.email}
                    onChange={handleChange}
                    />
                </div>
                 <div className='mb-3'>
                    <label className="form-label">Password</label>
                    <input
                    type='password'
                    style={{}}
                    className="form-control"
                    id="password"
                    name="password"
                    value={loginData.password}
                    onChange={handleChange}
                    />
                    </div>
                    <div className='d-flex mb-3'>
                        <p>Don't have an account?</p>
                        <a href="/signup" className="text-decoration-none">
                         &nbsp;Create Account
                        </a>
                    </div>
                   <div className='text-center '>
                    <button 
                    type="submit"
                    className="btn  w-25 w-md-25"                  
                    style={{backgroundColor:"rgb(252, 184, 13)"}}
                    >Login</button>
                    </div>
                </form>
            </div>
            </div>
        </div>
        </>
    );
}
export default Login;