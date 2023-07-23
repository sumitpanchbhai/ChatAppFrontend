import io from 'socket.io-client'
import React from 'react'
import Chat from './components/Chat';
import { Button,Card } from 'react-bootstrap';
const socket = io.connect("http://localhost:3001");
function App() {

  const [username,setUsername] = React.useState("")
  const [room,setroom] = React.useState("")
  const [showChat,setShowChat] = React.useState(true);

  const joinRoom = () =>{
    if (username!=='' && room!==''){
      socket.emit("jon_room",room)
      setShowChat(false);
    }else{
      window.alert("please fill the input fields");
    }
  }

  return (
    <div className="App">
      {/* connection with io socekt */}
      {showChat?(
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '300px',
          height: 'auto',
          backgroundColor: 'lightgray',
          border: '1px solid darkgray',
          textAlign: 'center',
          padding: '20px'    }}>
        <Card>
      <h1 style={{marginTop:'1rem',color:'green'}} > <b>Join the Chat</b> </h1>
      <input style={{margin:'10px 10px'}}  type="text" placeholder='please enter john' onChange={(e)=>setUsername(e.target.value)}/>
      <input style={{margin:'10px 10px'}}  type="text" placeholder='Room ID' onChange={(e)=>setroom(e.target.value)}/>
      <Button style={{margin:'10px 10px'}} onClick={joinRoom}>Join A Room</Button>
        </Card>
        </div>
      ):
      <Chat socket={socket} username ={username} room={room}/>    }
      
    </div>
  );
}

export default App;
