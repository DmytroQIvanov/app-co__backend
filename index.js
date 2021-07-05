const sqlite3 = require('sqlite3');
const initdb = require('./initdb.js');
const getstat = require('./get_stat.js');

const db = new sqlite3.Database('./somedb.sqlite');
const express = require("express");

const app = express();

const cors = require('cors')

app.use(express.json())
app.use(
  express.urlencoded({
    extended: true
  })
)

app.use(cors())

initdb.createTables(db, () => {
  initdb.fillTables(db, () => {
 
app.listen(process.env.PORT || 3002,'',()=>{console.log('server has been started '+process.env.PORT + 3002)});
   



    //getstat.getStatById(db, 3, data => {
   
  });
});

app.get("/users", function(request, response){
  // getUsers(request,response)
  getstat.getAllStats(db,request.query.limit,request.query.page, data => {
    console.log(data);
    response.send(data)
  });
});

app.get("/users-length", function(request, response){
  // getUsers(request,response)
  getstat.getNumbersOfUsers(db,data => {
    response.send(data)
  });
});


app.get("/user/:id", function(request, response){
  
  

  getstat.getStatById(db,request.params.id,data=>{
    response.send(data)
  })
});



app.get("/user-data/:id", function(request, response){
getstat.getUserData(db,request.params.id,request.query.startDate,request.query.endDate,data => {
  response.send(data)
});
});
