const https=require('https');
const port=process.env.PORT || 5000;
const express=require('express');
const bodyParser=require('body-parser')
const app=express();
app.use(bodyParser.urlencoded({extended:true}))
app.get("/",function(req,res){
return res.sendFile(__dirname +"/index.html"); 
});
app.post("/",function(req,res){
 const a=req.body.area;

  const url = "https://api.openweathermap.org/data/2.5/weather?q="+a+"&appid=35c93366d2c3fd3409b5edb65ee0ca6d&units=metric";

   https.get(url, function (response) 
   {
    console.log(response.statusCode);
    response.on("data", function(data) {
    var weatherdata = JSON.parse(data)
    const tep= weatherdata.main.temp;
    const weatherdesc = weatherdata.weather[0].description
    const icon = weatherdata.weather[0].icon
    const imgurl = "https://openweathermap.org/img/wn/" + icon + "@2x.png"

    res.write("<h1>The Temp in "+ a + " is " + tep + " degree celcius and weather will be " + weatherdesc + "</h1>");
    res.write("<img src=" + imgurl + ">")

  })
})
}); 
app.listen(process.env.PORT || port,function()
{
  console.log("server is up at port:"+ port);
});