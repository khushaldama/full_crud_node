const express=require("express")
const mongoose=require("mongoose")
const app=express()

app.use(express.json());
app.use(express.static(__dirname));


mongoose.connect("mongodb://127.0.0.1:27017/emp")

const conn=mongoose.connection;

conn.on("connected",()=>{
    console.log("manodb connected")
})

const userschema=mongoose.Schema(
    {
        empid:String,
        empname:String,
        role:String,
        password:String,
        email:String,
        designation:String,
        empdept:String,
        empsalary:Number,

    }
)
const user=mongoose.model('user',userschema,"Employee")

app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/login.html")
})


app.get('/api/getdata', (req, res) => {
    user.find().then((data)=>{
        res.json(data)
    })
    
});
app.post('/api/adddata',(req,res)=>{
    user.create({
            empid:req.body.empid,
            empname:req.body.empname,
            role:req.body.role,
            password:req.body.password,
            email:req.body.email,
            designation:req.body.designation,
            empdept:req.body.empdept,
            empsalary:req.body.empsalary,
    }).then((data)=>{
        res.json(data)
    })
})

app.listen(4000,()=>{
    console.log('running on 4000')
});

