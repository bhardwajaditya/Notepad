var express= require("express");
var app = express();
var BodyParser= require("body-parser")
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/notepad");


var UserSchema =new mongoose.schema({
   name: String,
   data : String
});


var User = mongoose.model("User",UserSchema);

app.set("view engine","ejs");
app.use(BodyParser.urlencoded({extended : true}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});




app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Server started!!");
})