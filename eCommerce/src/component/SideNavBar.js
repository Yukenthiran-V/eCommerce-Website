import React, { useState } from 'react';
import { Button } from 'react-bootstrap'; // Using Button from react-bootstrap

const SideNavbar = ({ showSidebar , setShowSidebar }) => {
    
   
  return (
    <div className={`offcanvas offcanvas-start ${showSidebar ? 'show' : ''}`} tabIndex="-1" aria-labelledby="offcanvasExampleLabel">
      <div className="offcanvas-header">
        <h5 id="offcanvasExampleLabel">ukcart</h5>
        <Button variant="close" onClick={()=>setShowSidebar(false)} aria-label="Close">
        
        </Button>
      </div>
      <div className="offcanvas-body">
        <ul className="list-unstyled">
          <li>Home</li>
          <li>Categories</li>
          <li>Wishlist</li>
          <li>About Us</li>
          <li>Contact Us</li>
          <li>Logout</li>
        </ul>
      </div>
    </div>
  );
};

export default SideNavbar;
