const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");
const cors = require("cors")
const { PORT, HOST, DB} = require("./config");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(routes);

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
},(err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("Database connected successfully")
    }
})

app.listen(PORT, HOST, ()=>{
    console.log(`App running on ${HOST}:${PORT}`);
})