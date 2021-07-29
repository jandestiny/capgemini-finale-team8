const express = require("express")
const apiRouter = require("./routes/api")
const app = express()
require('dotenv').config()
var dht_sensor = require("node-dht-sensor");
const ccs811 = require("ccs811-sensor")
air_quality_sensor = ccs811.CCS811()
const port = process.env.PORT || 3000

//airquality: https://www.npmjs.com/package/@chirimen/ccs811
//airquality2: npm i ccs811-sensor

app.set("view engine", "ejs")
app.use("/api", apiRouter)

app.get("/", (req, res) => {
    get_dht_data()
    res.render("index")
    get_air_quality_data()
})

app.listen(port, () => console.log(`Listening on port ${port}`))

function get_dht_data(){
    dht_sensor.read(22, 4, function(err, temperature, humidity) {
        if (!err) {
          console.log(`temp: ${temperature}°C, humidity: ${humidity}%`);
        }
      });
}

function get_air_quality_data(){
  result = air_quality_sensor.readData()
  console.log("co2: " + result.tvoc + ", tvoc: " + result.tvoc)
}