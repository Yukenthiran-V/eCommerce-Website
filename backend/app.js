const express=require("express");
const app=express();
require("dotenv").config();
const db=require("./src/database/database");
const router=require("./src/router/routes");
const fs=require("fs");
const cors=require('cors');


//middle ware 
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// app.use(cors());
const corsOptions={
    origin:"http://localhost:3000",
};
app.use(cors(corsOptions));




// cors 
//    cross origin requests 
//        the req is coming in port 3000 but server running in the port 3001 these 
//  two port are different so we need to allow the request to come from the different port
const port=process.env.PORT || 3000;
// function add(a,b){
//     return a+b;
// }

// (function Categories(){
//     const url = 'https://dummyjson.com/products/categories';
//     const method = 'GET';

//     fetch(url, { method })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         return response.json();
//     })
//     .then(data => {
//         if (data) {
//             try {
//                 const sql = `insert into product_categories(id, name, url) values (?, ?, ?)`;
//                 data.forEach((d, index) => {
//                     db.query(sql, [index + 1, d.name, d.url]);
//                 });
//             } catch (err) {
//                 console.error(err);
//             }
//         }
//     })
//     .catch(err => console.error('Error fetching categories:', err));
// })();



// fs.readFile("C:/Project/Backend/products.json", 'utf8', (err, data) => {
//     if (err) {
//         console.error('Error reading the file:', err);
//         return;
//     }

//     // Parse the JSON data
//     const productsData = JSON.parse(data);
//     const products = productsData.products;

//     // Connect to the database
//     //      // Prepare the SQL insert statement
//         const sql = `
//             INSERT INTO products (
//     id, title, description, category, price, discountPercentage, rating, stock,
//     brand, sku, weight, warrantyInformation, shippingInformation) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    
//     const sql2=`update products set price = ? where id = ?`;
//     // availabilityStatus=?,
//     // returnPolicy=?,
//     // minimumOrderQuantity =?,
//     // createdAt=?,
//     // updatedAt=?,
//     // thumbnail=?,
//     // images=?,
//     // tags=?,
//     // reviews=?
  
// // ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)        `;

//         // Insert each product into the database
//         products.forEach(product => {
//             const imagesJson = JSON.stringify(product.images); // Convert images array to JSON string
//             const tagsJson = JSON.stringify(product.tags); // Convert tags array to JSON string
//             const dimensionsJson = JSON.stringify(product.dimensions); // Convert dimensions object to JSON string
//             const reviewsJson = JSON.stringify(product.reviews); // Convert reviews array to JSON string

//           db.query(sql2, [
//             parseInt(Math.round(product.price * 8)*(1-product.discountPercentage/100)),
//                 // product.shippingInformation,
//                 // product.availabilityStatus,
//                 // product.returnPolicy,
//                 // product.minimumOrderQuantity,
//                 // product.meta.createdAt,
//                 // product.meta.updatedAt,
//                 // product.meta.barcode,
//                 // product.meta.qrCode,
//                 // product.thumbnail,
//                 // imagesJson,
//                 // tagsJson,
               
//                 // reviewsJson,
//                 //  dimensionsJson,
//                  product.id
//             ], (err, results) => {
//                 if (err) {
//                     console.error('Error inserting data:', err);
//                 } else {
//                     console.log('Inserted product with ID:', results.insertId);
//                 }
//             });
//         });
//     });

app.use("/",router);
app.listen(port,()=>{
    console.log("server is running on port : "+port);
});
console.log("yukenthiran");