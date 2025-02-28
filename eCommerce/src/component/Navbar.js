import React, { useEffect, useState } from 'react';
import Cookies from "js-cookie";
import SideNavbar from './SideNavBar';
// import logo from "../assets/images/ukcart.png";
function Navbar() {
  const [userData, setUserData] = useState(null);
  
   const [showSidebar, setShowSidebar] = useState(false); // State to toggle sidebar visibility

  const toggleSidebar = (status) => {
    setShowSidebar(status); // Update the sidebar visibility
  };
  
  useEffect(() => {
    const getData = Cookies.get("userData");
    if(getData!==null&&getData!==""&&getData!==undefined){
    const parsedData = JSON.parse(getData);
    setUserData(parsedData);
    }
  }, []);

  return (
    <>
           <SideNavbar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

      <nav className="navbar navbar-expand-lg p-3 " style={{backgroundColor:"rgb(243, 243, 243)"}}>
        <div className="container-fluid" style={{ justifyContent: "normal"}}>
          <button style={{border:"none",fontSize:"30px"}} onClick={() => toggleSidebar(true)} className="d-lg-none"><i class="bi bi-list"></i></button>
          <a className="navbar-brand fs-3" href="/">
            <img
              src={require('../assets/images/uk_cart_logo.png')}
              alt="uk logo"
              style={{ height: '50px',borderRadius:"10px" }}
            />
          </a>
         
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {/* search  bar */}
            <form className=" input-group d-flex w-50 w-md-50 w-sm-75 mx-2 ">
              <input
                className="form-control "
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                className="btn"
                style={{ backgroundColor: 'rgb(252, 184, 13)' }}
                type="submit"
              >
                <i className="bi bi-search"></i>
              </button>
            </form>

            <ul className="navbar-nav me-auto mb-2 mb-lg-0 w-100 d-flex justify-content-around">
              <li className="nav-item  ">
                <a className="nav-link active" aria-current="page" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item ">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="/categories"
                >
                  Wishlist
                </a>
              </li>
              {/* <li className="nav-item mx-3">
                  <a
                    className="nav-link active"
                    aria-current="page"
                    href="/home"
                  >
                    about
                  </a>
                </li> */}
              <li className="nav-item ">
                <a className="nav-link active" aria-current="page" href="/home">
                  contact
                </a>
              </li>
           
            {/* user and cart icon */}
           
              <li className="nav-item ">
                <a className="nav-link" href="/cart">
                  <i className="bi bi-cart"></i> Cart
                </a>
              </li>
             
              {userData?.first_name ? (
                // <li className="nav-item mx-1">
                //   <a className="nav-link" href="/cart">
                //      {userData?.first_name}
                //   </a>
                // </li>
                 <li className="nav-item dropdown">
              <a className="d-flex nav-link text-decoration-none text-dark" href="*" id="electronicsDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i className="bi bi-person"></i>  &nbsp;{userData?.first_name.substring(0,1).toUpperCase()+userData?.first_name.substring(1,userData?.first_name.length)} &nbsp;
                {/* <i className="bi bi-caret-down-fill " style={{ marginTop: "2px", color: "rgb(82, 91, 105)", fontSize: "15px" }}></i> */}
              </a>
              <ul className="dropdown-menu " aria-labelledby="electronicsDropdown">
                <li>
                  <a className="dropdown-item" href="*">
                    My Profile
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="*">
                    Wishlist
                  </a>
                </li>
                <hr/>
                <li>
                  <a className="dropdown-item" href="/logout">
                    Logout
                  </a>
                </li>
              </ul>
            </li>
              ) : (
                <li className="nav-item mx-1">
                  <a className="nav-link" href="/login">
                    Login/Signup
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
export default Navbar;
