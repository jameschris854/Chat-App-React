import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import conversationReducer from '../features/conversation/conversationSlice';
import userReducer from '../features/users/usersSlice';
import { createSocketMiddleware } from '../middleware/socketMiddleware';

export const store = configureStore({
middleware:getDefaultMiddleware => getDefaultMiddleware().concat(createSocketMiddleware(`${process.env.REACT_APP_DOMAIN}/v1/chat`)),
  reducer: {
    auth: authReducer,
    conversation:conversationReducer,
    users: userReducer
  },
});