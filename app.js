var express=require("express");
var app=express();
var bodyParser=require("body-parser");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
const port = 3000

app.get('/', function(req, res){ 
    res.render("index")});

app.post('/musicPage',function(req,res){
 res.render("musicPage");
});

app.post('/musicResult',function(req,res){
    var input=req.body.searchParam;
    console.log(input);
    console.log(req.body.choices);
});
   


app.post('/foodPage',function(req,res){
    res.render("foodPage");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));