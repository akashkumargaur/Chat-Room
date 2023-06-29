const e = require('express');
let express=require('express');
let app=express()
const port =8000;

var http=require('http').Server(app)
var io=require('socket.io')(http)

const path=require('path')
const mainfile=path.join(__dirname,"../")
// console.log(mainfile)
app.use(express.static(mainfile))

app.get("/",(req,res)=>{
    res.sendFile(mainfile+'./index.html')
})

const ActiveUser={}

io.on('connect',(socket)=>{
    socket.on('new_user_joined',(username)=>{
        // console.log(username)
        ActiveUser[socket.id]=username;
        socket.broadcast.emit("user-joined",username);
        socket.on('disconnect',()=>{
            socket.broadcast.emit("user-left",username);
        })
    })
    socket.on('send',(message)=>{
        // console.log(message)
        socket.broadcast.emit("receive",{
            message:message,
            username:ActiveUser[socket.id]
        });
    })
})

http.listen(port,(err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log('Server is running at port',port)
    }
})