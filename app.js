var express=require("express");
var app=express();
var bodyParser=require("body-parser");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
const port = 3000

 app.get('/', function(req, res){ 
     res.render("index")});

app.get('/musicPage',function(req,res){
//    res.render("index");   
  res.render("musicPage");
});

app.post('/musicResult',(req,res)=>{
    var input=req.body.searchParam;
    var inputType=req.body.choices;
    if(inputType==="By Artist"){
    var apiRequest=require('request');
    apiRequest('https://www.theaudiodb.com/api/v1/json/1/track-top10.php?s='.concat(input),function(error,resposne,body){
        if(!error && resposne.statusCode==200){
            var resposneData=JSON.parse(body)["track"];
            res.render("musicPage",{data:resposneData});
        }
    })
}
if(inputType==="By Album"){
    var apiRequest=require('request');
    apiRequest('https://www.theaudiodb.com/api/v1/json/1/track-top10.php?s='.concat(input),function(error,resposne,body){
        if(!error && resposne.statusCode==200){
            var resposneData=JSON.parse(body)["track"];
            res.render("musicPage",{data:resposneData});
        }
    })
}
});
   


app.get('/foodPage',function(req,res){
    res.render("foodPage");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));