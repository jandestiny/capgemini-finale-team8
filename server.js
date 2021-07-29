const express = require("express")
const path = require("path");
const fetch = require('node-fetch');
const app = express()
require('dotenv').config()
const port = process.env.PORT || 3000

var posts = []

app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, "public")))



app.get("/", (req, res) => {
  res.sendFile('public')
})

app.get("/api/posts", (req, res) => {
  let date = req.query.date
  let no_of_posts = req.query.no_of_posts

  //Get previous {no.of.posts} from {date} from db
})

app.get("/api/posts/trend", (req, res) => {
  let date = req.query.date
  let no_of_posts = req.query.no_of_posts

  //Get previous {no.of.posts} from {date} from db with {trend}
})

app.listen(port, () => console.log(`Listening on port ${port}`))


function get_and_analyze_live_data(){
  let url = "https://rvj6rnbpxj.execute-api.eu-central-1.amazonaws.com/prod/live-data"

  result = fetch(url)
  .then(response => response.json())
  .then(result => {
    
  })
  .catch(function(error) {

  });
}

function get_hottest_room(rooms){
  let hottest_room = rooms[0]

  rooms.forEach(element => {
    if(element.temperature > hottest_room.temperature){
      hottest_room = element
    }
  });

  if(hottest_room.temperature > 23.0){
    create_post("Capgemini-API","It is getting pretty warm in Room '" + hottest_room_room.id + "', you should enable air conditioning!", ["temperature", "airconditioning"])
  }
}

function get_coldest_room(rooms){
  let coldest_room = rooms[0]

  rooms.forEach(element => {
    if(element.temperature < coldest_room.temperature){
      coldest_room = element
    }
  });

  if(coldest_room.temperature < 17.0){
    create_post("Capgemini-API","It is getting chilly in Room '" + coldest_room.id + "', you should turn up the heat!", ["temperature", "heater"])
  }
}

function get_highest_power_consumption(rooms){
  let highest_power_room = rooms[0]

  rooms.forEach(element => {
    if(element.powerConsumption > highest_power_room.powerConsumption){
      highest_power_room = element
    }
  });

  if(highest_power_room.powerConsumption > 1.0){
    create_post("Capgemini-API","There's a high power consumption in Room '" + highest_power_room.id + "', either it's full or someone left there notebook plugged in over night!", ["power"])
  }
}

function create_post(user, content, hashtags){
  
  posts.push()
}

function getCurrentUnixTime(){
  return Math.round((new Date()).getTime() / 1000)
}