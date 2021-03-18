const express = require("express") ;
const pruductRoutes = require("./routes") ;
const mongoose = require("mongoose");

const PORT = 5000;

const app = express();
mongoose.connect("mongodb+srv://dudckd:013111@youtb.mdyrj.mongodb.net/hello?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(()=>console.log("MongoDB Connected..."))
    .catch(err => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended:true}));

app.use('/api/products', pruductRoutes)

app.get('/',(req,res)=>{
    res.send("hellow") 
})

app.listen(PORT, ()=> console.log(`Running on port ${PORT}`))