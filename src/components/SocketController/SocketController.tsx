import React from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

const SocketController = () => {
    const authToken: any = useSelector((state:any) => state.auth.authToken)

    const socket = io(`${process.env.REACT_APP_DOMAIN}/v1/chat`,{
      extraHeaders: {
        "Authorization": `Bearer ${authToken}`
      }
    }).connect()
  
    socket.on("CONVERSATIONS",(e) => {
      console.log('CONVERSATIONS',e)
    })
  
    socket.on("ONLINE_COUNT",(e) => {
      console.log('ONLINE_COUNT',e)
    })
  
    socket.on("CONNECTION_COMPLETE",(e) => {
      console.log('CONNECTION_COMPLETE',e)
    })
  
    socket.on("PROFILE",(e) => {
      console.log('PROFILE',e)
    })
  
    socket.on("RECIEVE_MESSAGE",(e) => {
      console.log('RECIEVE_MESSAGE',e)
    })
  
    socket.on("JOIN_CONVERSATION",(e) => {
      console.log('JOIN_CONVERSATION',e)
    })
    
    return null;
}

export default SocketController;