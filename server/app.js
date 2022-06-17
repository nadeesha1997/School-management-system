require("dotenv").config();
const express=require("express");
const app=express();
const mongoose=require("mongoose");
const {DbURL}=require('./config');
const port=8003;

const taskRoutes=require("./routes/api/tasks")
app.use(express.json());

mongoose.connect(DbURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>console.log("DB connected"))
.catch((err)=>console.log(err));

app.use('/api/tasks',taskRoutes);



app.listen(port,()=>{
    console.log('server is at port number '+port);
});
