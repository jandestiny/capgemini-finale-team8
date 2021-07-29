var currentTime = Math.round((new Date()).getTime() / 1000)
console.log("current time: " + currentTime)

var host = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '');

var loadPosts = 0
var currentLastPostId = null

function getNext10Posts(){
    let url = host + `/api/posts?date=${currentTime}&posts=${loadPosts+10}`
    loadPosts += 10


}