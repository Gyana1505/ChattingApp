const socket = io('http://localhost:8000');
//console.log('heloo');

const form=document.getElementById("send-form")
const inputms=document.getElementById("inputms")
const msgcontainer=document.querySelector(".container")
const bt=document.getElementById("gt")
let sound=new Audio('music.wav')

const add=(message,posi)=>{
    
    let msgele=document.createElement('div')
    msgcontainer.append(msgele)
    msgele.innerText=message
    msgele.classList.add('message')
    //if (posi) {
        msgele.classList.add(posi); // Add class based on the `posi` parameter
    //}
    if(posi=='left'){
        sound.play()
    }
    
    

}

bt.addEventListener('click',(e)=>{
    
    
    e.preventDefault();
    const message=inputms.value;
    console.log(message);
    
    add(`You:${message}`,'right')
    socket.emit('send',message)
    inputms.value=''


    //console.log(hii);
    
})


let nam = prompt("Enter your name to join")
socket.emit('new-user-join', nam)

socket.on('user-join',nam=>{
    
    add(`${nam} join the chat`,"left")
})

socket.on('receive',data=>{
    add(`${data.nam}:${data.message}`,'left')
})

socket.on('leav',nam=>{
    add(`${nam} left the chat`,'left')
})