const express = require("express")
const path = require("path");
const fetch = require('node-fetch');
const app = express()
require('dotenv').config()
const host = process.env.HOSTNAME || "localhost"
const port = process.env.PORT || 3000

var posts = [
  {
    user: 'Capgemini-API',
    timestamp: 1627579292,
    content: `There's high power consumption in Room 'V', either it's full or someone left their notebook plugged in over night! <a href="/trends-detail.html?trend=power">#power</a> `
  },
  {
    user: 'Capgemini-API',
    timestamp: 1627579292,
    content: `It's getting really hot in Room 'C', cooling please! <a href="/trends-detail.html?trend=temperature">#temperature</a> <a href="/trends-detail.html?trend=airconditioning">#airconditioning</a> `
  },
  {
    user: 'Capgemini-API',
    timestamp: 1627579292,
    content: `The oxygen-levels are critically low in Room 'V', you should open the windows if possible! <a href="/trends-detail.html?trend=oxygen">#oxygen</a> `
  }
]

app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, "public")))

get_and_analyze_live_data()


app.get("/", (req, res) => {
  res.sendFile('public')
})

app.get("/api/posts", (req, res) => {
  console.log("getting posts")
  let unixtimestamp = req.query.unixtimestamp
  let no_of_posts = req.query.no_of_posts
  console.log(unixtimestamp + "," + no_of_posts)
  
  filtered_posts = posts.slice(0, no_of_posts)
  console.log("filter: " + filtered_posts)

  return res.json(filtered_posts)
})

app.get("/api/posts/trend", (req, res) => {
  let date = req.query.date
  let no_of_posts = req.query.no_of_posts

  //Get previous {no.of.posts} from {date} from db with {trend}
})

app.get("/update", (req, res) => {
  get_and_analyze_live_data()
  res.status(200)
  res.end()
})

app.listen(port, () => console.info(`\nRunning on: http://${host}:${port}/ (Ctrl+Click to open)\n`))


function get_and_analyze_live_data(){
  let url = process.env.CAPGEMINIMOCKAPI || ""

  result = fetch(url)
  .then(response => response.json())
  .then(result => {
    rooms_analysis(result.rooms)
    console.log(posts)
  })
  .catch(function(error) {
    // console.log("Couldnt fetch rooms, trying again later..", error)
    console.log("Could not fetch mocked data API, defaulting to exemplary posts..")
  });
}

function rooms_analysis(rooms){
  get_hottest_room(rooms)
  get_coldest_room(rooms)
  get_highest_power_consumption(rooms)
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
    create_post("Capgemini-API","There's high power consumption in Room '" + highest_power_room.id + "', either it's full or someone left their notebook plugged in over night!", ["power"])
  }
}

function create_post(user, content, hashtags){
  posts.push({user:user, timestamp:getCurrentUnixTime(), content:content+wrapHashtagsInHtml(hashtags)})
  posts = posts.sort((a,b) => b.timestamp - a.timestamp)
}

function wrapHashtagsInHtml(hashtags){
  result = ""

  hashtags.forEach(hashtag => {
    result += ` <a href="/trends-detail.html?trend=${hashtag}">#${hashtag}</a> `
  })

  return result
}

function getCurrentUnixTime(){
  return Math.round((new Date()).getTime() / 1000)
}