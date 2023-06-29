const socket=io();
const form=document.getElementById('submit')
const messageInput=document.getElementById('send_msg')
const messageContainer=document.getElementById('messagebox')
let send=new Audio('./Audio/send.mp3')
let received=new Audio('./Audio/Received.mp3')

const Append=(message,position)=>{
    const messageElement=document.createElement("div");
    messageElement.innerText=message;
    messageElement.classList.add(position);
    messageContainer.appendChild(messageElement)
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageInput.value;
    Append(` You: ${message}`,'message-right')
    socket.emit('send',message)
    send.play()
    messageInput.value=''
})

const username=prompt('enter your username')
socket.emit('new_user_joined',username)

socket.on('user-joined',(socket)=>{
    Append(`${socket} joined the party :)`,'message-center')
})
socket.on('user-left',(socket)=>{
    Append(`${socket} left the party ;(`,'message-center')
})
socket.on('receive',(data)=>{
    Append(`${data.username} : ${data.message}`,'message-left')
    received.play()
})

