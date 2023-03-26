// Actions

import { createAction, nanoid } from "@reduxjs/toolkit";

// Get data
export const getData = createAction('socket/getData', data => {
    return {
      payload: {
        data,
        id: nanoid(),
        createdAt: new Date().toISOString(),
      },
    };
  });
  
  // Send data
  export const sendData = createAction('socket/sendData', data => {
    return {
      payload: {
        data,
        id: nanoid(),
        createdAt: new Date().toISOString(),
      },
    };
  });
  
  // Disconnect
  export const disconnect = createAction('socket/disconnect');