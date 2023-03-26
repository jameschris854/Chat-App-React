import { DefaultEventsMap } from "@socket.io/component-emitter";
import { io, Socket } from "socket.io-client";
import { recieveMessage, setConversations, setProfile } from "../features/conversation/conversationSlice";

const createSocketMiddleware = (url:string) => {
    let socket: Socket<DefaultEventsMap, DefaultEventsMap> ;

    return storeAPI => next => action => {

        switch (action.type) {
            // Connect after user is authenticated
            case "auth/setAuthToken": {
                socket = io(url,{
                extraHeaders: {
                    "Authorization": `Bearer ${action.payload}`
                }
                }).connect()

              socket.on("PROFILE",(e) => {
                if(e){
                    console.log('PROFILE',e)
                    storeAPI.dispatch(setProfile(e))
                }
              })

              socket.on("CONVERSATIONS",(e) => {
                if(e.length){
                    console.log('CONVERSATIONS',e)
                    storeAPI.dispatch(setConversations(e))
                }
              })

              socket.on("RECIEVE_MESSAGE",(e) => {
                if(e){
                    console.log('RECIEVE_MESSAGE',e)
                    storeAPI.dispatch(recieveMessage(e))
                }
              })
            
              // Connect and listen
              socket.on("CONNECTION_COMPLETE",() => {
                console.log('CONNECTION_COMPLETE')
              })

              break;
            }
      
            // Send data
            case 'conversation/joinConversation': {
                console.log('act',action.type)
              socket.emit('JOIN_CONVERSATION', {
                conversationId:action.payload
              });
              break;
            }

            // Send data
            case 'conversation/sendMessage': {
              console.log('act',action.type,storeAPI.getState())
              socket.emit('SEND_PERSONAL_MESSAGE', {
                conversationId:storeAPI.getState().conversation.activeConversation.id,
                content:action.payload
            });
              break;
            }

            // Start Conversation
            case 'conversation/startConversation': {
              console.log('startConversation',action.type,storeAPI.getState())
              socket.emit('START_CONVERSATION', {
                content:action.payload.content,
                recipientId: action.payload.recipientId
            });
              break;
            }
      
            // // Disconnect
            // case 'socket/disconnect': {
            // socket.disconnect();
            //   break;
            // }
          }

          return next(action);
    };
}

export {createSocketMiddleware};
