// const db=require("../database/database");
const { json } = require("express");
const {checkAuthentication, getApiKey,getProducts} = require("./commonController");
// const=require("./commonController")

async function getApiKeyByName(req,res){
 try{
    var {secret_key,name}=req.body;
        if(secret_key==="yukenthiran@soft.com"){
             const results = await getApiKey(name);
             res.status(200).send({message:"success",result : results});
         }
         else{
           res.status(400).send({message:"error",result:"Secret key is not same"});
         }
 }
 catch(err){
    console.log(err)
 }
}
async function getAllProducts(req,res){
 try{
    const api_key=req.headers['authorization'];
    const clearedApi=api_key.split(" ")[1].trim();
    const authentication=await checkAuthentication(clearedApi);
    if(authentication==="valid"){
       const product_results = await getProducts();
            product_results.forEach((product) => {
            try {
            product.images = JSON.parse(product.images);
            product.reviews = JSON.parse(product.reviews);
            product.tags = JSON.parse(product.tags);
            product.dimensions = JSON.parse(product.dimensions);
            } catch (error) {
             console.error(`Error parsing product data: ${error.message}`);
            }
   });
       res.status(200).send({message:"success",result : product_results});
    }
    else{
       res.status(400).send({message:"Error",result:"Api-key is not correct"})
    }
    }
    catch(Error){
       res.status(401).send({message:"Error",result:"Not found key"})
    }
    
}

module.exports={getApiKeyByName,getAllProducts};