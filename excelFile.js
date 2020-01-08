var express=require("express");
var app=express();

const port = 3000

app.get('/', function(req, res){ 
    res.sendFile("D:/Tech_Materials/NOTES/MyAPIApp/file.xlsx")});

    
app.listen(port, () => console.log(`Excel app listening on port ${port}!`));