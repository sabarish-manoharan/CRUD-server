const express = require('express')
const app = express();
const userData = require('./sample.json')
const fs = require('fs')
const path = require('path');
const port = 3000;
const cors = require ('cors')
app.use(express.json());
app.use(cors())

//optional  app.use(cors({
//             origin:"http://localhost:5173/",
//              methods:["GET", "POST","PATCH","DELETE"]}));

app.get('/users',(req,res)=>{
    res.json(userData)
})


app.delete('/users/:id',(req,res)=>{
    let id =Number(req.params.id);
    let filterUser = userData.filter((user)=>user.id!==id);
    fs.writeFile((path.join(__dirname,'./sample.json')),JSON.stringify(filterUser),(err,data)=>{
        if(err){
            console.log(err)
        }
        else{
            res.json(filterUser)
        }
    })
})

app.post('/users',(req,res)=>{
let {name,place,nickname} = req.body;
if(!name || !place || !nickname){
   return res.status(400).send({message:"All Fields Required"});
}
let id = Date.now();
    userData.push({id,name,place,nickname});

    fs.writeFile((path.join(__dirname,'./sample.json')),JSON.stringify(userData),(err,data)=>{
        if(err){
            console.log(err)
        }
        else{
            res.json({message:"User Details added successfully!"})
        } 
    })
})


app.patch('/users/:id',(req,res)=>{
    let id = Number(req.params.id);
    let {name,place,nickname} = req.body;
    if(!name || !place || !nickname){
       return res.status(400).send({message:"All Fields Required"});
    }
    let index = userData.findIndex((user)=>user.id==id);
    userData.splice(index,1,{...req.body});
    
        fs.writeFile((path.join(__dirname,'./sample.json')),JSON.stringify(userData),(err,data)=>{
            if(err){
                console.log(err)
            }
            else{
                res.json({message:"User Details updated successfully!"})
            } 
        })
    })
    

app.listen(port, (err) => {
    if (err) {
        console.log(err)
    }
    else {
        console.log("Server is runnning on " + port);
    }
})