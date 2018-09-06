var express= require("express");
var app = express();
var BodyParser= require("body-parser")
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/notepad");

app.use(express.static("public"));
var UserSchema =new mongoose.Schema({
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


app.get("/:name",function(req,res){
   var name=req.params.name;
   var data;
   User.find({name:name},function(err,user){
      if(err){
          console.log(err);
      } 
      else{
          if(!user.length){
              User.create({
                  name:name,
                  data:""
              },function(err,user1){
                  if(err){
                      console.log(err);
                  }
                  else{
                      console.log("New user added");
                      console.log(user1);
                      res.render("home",{data:user1.data,name:user1.name});
                  }
              });
          
          }
          else{
          res.render("home",{data:user[0].data,name:user[0].name});}
      }
   });
});

app.post("/:name",function(req,res){
   var name=req.params.name;
   var data=req.body.data;
   
   User.update({name:name},
   {
       $set:{data:data}
   },function(err,user){
        if(err){
            console.log(err);
        }
        else{
            console.log("Updated");
        }
   })
   res.redirect(name);
});

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Server started!!");
})