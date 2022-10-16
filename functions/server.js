const express = require('express');
const  cors = require('cors');
const app = express();
require('dotenv').config();
const port = 8080;
const mongoose = require('mongoose');
const User = require('./model/usersignup');
app.use(cors({origin:true}));
app.use(express.urlencoded({urlencoded:true}))
app.use(express.json());


mongoose.connect('mongodb+srv://Ashish:Ashish@cluster0.vgss5.mongodb.net/Userstest?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("database connected")
}).catch((err)=>{
    console.log(err)
});

app.post('/users/signup',async(req,res)=>{

    try {
        const username=req.body.username
        const getmyUser= await User.findOne({username:username})
        if(!getmyUser){
        if(req.body.password === req.body.confirmpassword){
            const user = new User({
                username:req.body.username,
                password:req.body.password,
                confirmpassword:req.body.confirmpassword
            })
            await user.save();
            res.json(user)
        }
        else{
            res.status(401).json({
                message:"password should be same"
            })
        }}else{
            res.status(200).json({
                message:"username already exist, try some unique one"
            })
        }
        // const user = new User({
        //     username:req.body.username,
        //     password:req.body.password,
        //     confirmpassword:req.body.confirmpassword
        // })
        // await user.save();
        // res.json(user)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Internal server error",
            error:error
        })
    }
    
})

app.post('/users/login',async(req,res)=>{
    try {
        const username = req.body.username
        const password = req.body.password
        if(!username && !password){
            res.send({
                message:"please enter username and password"
            })
        }
        else{
            const user = await User.findOne({username:username}).select('_id username')
            if(!user){
                res.send({
                    message:"User not found"
                })
            }
            res.send(user)
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
})

app.listen(port,()=>{
    console.log("start")
})