var mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/myapiappDB",{ useNewUrlParser: true },{ useUnifiedTopology: true });

var trackSchema=new mongoose.Schema({
    artist:String,
    tracks:[String],
    videoUrl:[String]
});

var PlayList=mongoose.model("PlayList",trackSchema);

module.exports ={data:PlayList};

