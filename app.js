var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');

var app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/login', loginRouter);

io.on("connection", socket=>{
    console.log("user connected");

    socket.on("disconnect", ()=>{
        console.log("user disconnected ");
    })

    socket.on("chat msg", msg =>{
        console.log("msg", msg);
        io.emit("chat msg", msg)
    })
})

module.exports = {app: app, server: server}
