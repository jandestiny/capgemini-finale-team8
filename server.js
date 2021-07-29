const express = require("express")
const path = require("path");
const app = express()
require('dotenv').config()
const port = process.env.PORT || 3000

app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, "public")))

app.get("/", (req, res) => {
  res.sendFile('public')
})

app.listen(port, () => console.log(`Listening on port ${port}`))


function get_dht_data(){
    dht_sensor.read(22, 4, function(err, temperature, humidity) {
        if (!err) {
          console.log(`temp: ${temperature}°C, humidity: ${humidity}%`);s
        }
      });
}

function get_air_quality_data(){
  result = air_quality_sensor.readData()
  console.log("co2: " + result.tvoc + ", tvoc: " + result.tvoc)
}