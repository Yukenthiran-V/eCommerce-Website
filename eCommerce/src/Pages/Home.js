
import React, { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import { config } from "../api/Api";
import Categories from "./categories/Categories";
import SlideBanner from "./categories/BannerSlide";
function Home(){
   const base_url=config.base_url;
    const [apiKey,setApiKey]=useState(null);
    const [products,setProducts]=useState([]);
    
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
}, []);

useEffect(()=>{
  async function fetchProduct(){
  debugger
 if(apiKey!==null && apiKey!==undefined && apiKey!==""){
    try {
      const response = await fetch(`${base_url}/get_products`, {
        method: "POST",
        headers: {
         "Authorization":`Bearer ${apiKey}`,
        //  "Content-Type":"application/json"
        },
      });
      if (response.ok) {
        const data = await response.json();
        if (data.message==="success") {
          setProducts(data.result);
          console.log("Products ");
          console.log(data.result);
        }
      } else {
        console.log("ERROR: Occured while fetching products");
        console.log("check api ");
      }
    } catch (err) {
      console.log(err);
    }

  };
}
fetchProduct();
 },[apiKey]);

   return (
     <>
       <Navbar />
       <SlideBanner />
       {/* <Categories /> */}
       <div className=" container-fluid  " >
         <div className="row" style={{ marginLeft: "3%" }}>
           {products?.map((product) => {
             // Check the conditions for filtering the products
             if (parseInt(product.id) % 5 === 0 && parseInt(product.id) <= 150) {
               return (
                 <div key={product.id} className="card  col-5 col-md-2 m-3">
                   <img
                     // src={product?.images?.[0]}
                     src={product?.thumbnail}
                     className="card-img-top "
                     alt={product?.title}
                     style={{ height: "200px", objectFit: "cover", cursor: "pointer" }}
                     loading="lazy"
                   />
                   <div className="card-body p-0">
                     <p className="card-title" style={{ fontSize: "1em" }}>
                       <strong>{product?.title.length >= 16 ? <>{product?.title.substring(0, 19)}...</> : product?.title}</strong>
                     </p>

                     <p className="card-text">{product?.brand}</p>
                     <p className="card-text">
                       <strong>Price: </strong>
                       {parseInt(product?.price) * 8}
                     </p>
                   </div>
                 </div>
               );
             }
           })}
         </div>
       </div>
     </>
   );
}
export default Home;

// "images":[
  // "https://cdn.dummyjson.com/products/images/tops/Gray%20Dress/1.png",
  // "https://cdn.dummyjson.com/products/images/tops/Gray%20Dress/2.png",
  // "https://cdn.dummyjson.com/products/images/tops/Gray%20Dress/3.png",
  // "https://cdn.dummyjson.com/products/images/tops/Gray%20Dress/4.png