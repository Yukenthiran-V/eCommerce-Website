const db = require("../database/database");
const utils = require("util");

const query = utils.promisify(db.query).bind(db);
 
async function getApiKey(name){
try{
     const result = await db.query("SELECT api_key FROM api_check WHERE name = ?", name);
    //  console.log(result);
     return result[0];
}
catch(err){
    console.error(err);
}
}
async function checkAuthentication(api_key){
    try{
  const sql =`SELECT result FROM api_check WHERE api_key = ?`;
  const result = await db.query(sql,api_key);
     return result[0][0].result;
    }
    catch(err){
       return err;
    }
}

async function getProducts(){
    try{
        const sql =`SELECT * FROM products `;;
        const result = await db.query(sql);
        return result[0];
    }
    catch(err){
        return err;
    }
}

module.exports={getApiKey,checkAuthentication,getProducts};