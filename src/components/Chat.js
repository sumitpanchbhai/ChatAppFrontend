import React, { useEffect } from 'react'
import { Card } from 'react-bootstrap';


export default function Chat({socket,username,room}) {
    const [currentMessage,setcurrentMessage] = React.useState('');
    const [listMessage,setListMessage] = React.useState([]);

    const sendCurrentMessageFunction = async ()=>{
        if(currentMessage!==""){


        const messageData = {
            room:room,
            author:username,
            message:currentMessage,
            time: new Date(Date.now()).getHours() + ":"+new Date(Date.now()).getMinutes() + ":"+new Date(Date.now()).getSeconds()
        }
        console.log(messageData)
        await socket.emit("send_data",messageData);
        setListMessage((prev)=>[...prev,messageData])

    }
    setcurrentMessage('');
    };

    useEffect(()=>{
        socket.on("recived_message",(data)=>{
            console.log(data)
            setListMessage((prev)=>[...prev,data])
        })
    },[socket])
  return (
    <div style={{ width: '300px',height: '500px',border:'2px solid ',position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
}} >
      <div style={{textAlign:'center'}}>
        <b>LiveChat</b>
      </div>
      <div style={{ height: 'calc(110% - 100px)', border: '1px solid #263238', position: 'relative', overflowY: 'auto',backgroundColor:'gray' }}>
        {listMessage.map((eachMessgae)=>{
          const itemStyle = {
            color: eachMessgae.author===username ? 'green' : 'blue',
            marginRight:'0.5rem',fontSize:'12px'
          };
            return (
              <div>
            <Card style={{margin:'5px 5px'}}>
              <h4 key={eachMessgae.time}>{eachMessgae.message}</h4>
            </Card>
            
            <div style={{display:'flex'}}>
              <h6 style={itemStyle}><b>{eachMessgae.author===username?'you':eachMessgae.author}</b></h6>
              <p style={{fontSize:'12px'}}>{eachMessgae.time}</p>
              </div>
            </div>)
            
        })}
      </div>
      <div>
        <input style={{width:'70%'}}type="text" placeholder='Hey...' value={currentMessage} onChange={(e)=>setcurrentMessage(e.target.value)}/>
        <button style={{width:'30%'}} onClick={sendCurrentMessageFunction}>&#9658;</button>
      </div>
    </div>
  )
}
