import { DefaultEventsMap } from "@socket.io/component-emitter";
import { io, Socket } from "socket.io-client";

const createSocketMiddleware = (url:string) => {
    let socket: Socket<DefaultEventsMap, DefaultEventsMap> ;

    return storeAPI => next => action => {
        switch (action.type) {
            // Connect after user is authenticated
            case 'user/login/fulfilled': {
                socket = io(url,{
                extraHeaders: {
                    "Authorization": `Bearer ${authToken}`
                }
                }).connect()
            
              // Connect and listen
              socket.on("CONNECTION_COMPLETE",() => {
                console.log('CONNECTION_COMPLETE')
              })
            }
      
            // Send data
            case 'socket/sendData': {
              socket.emit('order-pending', action.payload);
              break;
            }
      
            // Disconnect
            case 'socket/disconnect': {
            socket.disconnect();
              break;
            }
          }

          return next(action);
    };
}

export {createSocketMiddleware};