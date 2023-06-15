const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const mysql = require('mysql2');
const fetchSpeedQuery = `SELECT speed FROM Latest_Speed;`;


const path = require('path');
const publicDirPath = path.join(__dirname, '../public');
app.use(express.static(publicDirPath));
const port = process.env.PORT || 3000;
//------------------------------------------------------hostinger connection----------------------------------------------------
const connection = mysql.createConnection({
    host: '',
    port: '3306',
    database: '',
    user: '',
    password: ''
  });
  
  // Establish the connection with hostinger
  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to Hostinger database:', err);
      return;
    }
    console.log('Connected to Hostinger database!');
  });

  function fetchRecentData(callback) {//fetches the recent data(speed) fron the database
    connection.query(fetchSpeedQuery, (err, res) => {//when the query fecthing operationis completed it calls the callback function
      if (err) {
        console.error('Error fetching data from Latest_Speed table', err);
        callback(err, null);
        return;
      }
      const speed = parseInt(res[0].speed);
      callback(null, speed);
    });
  }
  
//--------------------------------------------------socket handler section------------------------------------------------


io.on('connection',(socket)=>{//establishes a connection to the server with client(one for each client)
    //   it get triggered when ever a client conncet to the server.'connection' event is an inbuilt socketio event
    console.log('connection extablished');

    const interval = setInterval(() => {
        fetchRecentData((err, speed) => {//sending a callback function to synchronize the fectch operation of database
          if (err) {
            console.error('Error fetching recent data:', err);
            clearInterval(interval); 
            return;
          }
         console.log('recived speed:',speed);
         socket.emit('speed',speed);
        });
      }, 1000);

      socket.on('disconnect',()=>{//stops fetching the the data from database when the client disconnects
        clearInterval(interval);
    })
});


//------------------------------------------------------server listner--------------------------------
app.get('/', (req,res)=>{
    res.send(index)
});

server.listen(port,()=>{
    console.log('listening on port:', port);
})