var express=require("express");
var app=express();
//var db=require("./db.js");
var apiRequest=require('request');

var mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/myapiappDB",{ useNewUrlParser: true },{ useUnifiedTopology: true });

var trackSchema=new mongoose.Schema({
    artist:String,
    tracks:[String],
    videoUrl:[String]
});

var playListVar=mongoose.model("PlayList",trackSchema);



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


app.get('/musicResult',(req,res)=>{
    var input=req["query"]["searchParam"];
    var inputType=req["query"]["choices"]; 
    //console.log(req["query"]);
    if(inputType==="By Artist"){
    
    apiRequest('https://www.theaudiodb.com/api/v1/json/1/track-top10.php?s='.concat(input),function(error,resposne,body){
        if(!error && resposne.statusCode==200){
            var resposneData=JSON.parse(body)["track"];
            res.render("musicPage",{data:resposneData});
        }
    })
}
});

app.post('/musicResult',(req,res)=>{
    var data=req.body.data;
    var topTracks=[String],urls=[String];
    data.forEach(function(data){
        topTracks.push(data["strTrack"]);
        urls.push(data["strMusicVid"]);
});
   // console.log(req.body.data);
   //var PlayList=db.data;
   playListVar.create({
        artist:data[0]["strArtist"],
        tracks:topTracks,
        videoUrl:urls 
        
    },function(err,playList){
        if(err){
            console.log(err);
        }else{
            console.log(playList);
            console.log("SONGS SAVED");
        }

    });

});

app.get('/savedLists',(req,res)=>{
 
    //res.render("savedPlaylists",{data:});
    console.log("Retreive clicked");
    playListVar.find({},function(err,playlists){
        if(err)
            console.log(err);
        else
         {console.log(playlists);
         res.render("savedPlaylists",{data:playlists});
         }
    });
     
});

app.get('/playlists/:id',(req,res)=>{
    playListVar.findById(req.params.id,function(err,songs){
        if(err)
            console.log(err);
        else
            res.render("topSongs",{data:songs});

    });
     
});



 


app.get('/foodPage',function(req,res){
    res.render("foodPage");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));