import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profile:{},
  conversations: [],
  activeConversation: {
    id: 0
  },
  recentConversations: []
};

type state = {auth: typeof initialState};
export const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setProfile: (state,action) => {
      state.profile = action.payload;
    },
    setConversations: (state,action) => {
      state.conversations = action.payload;
    },
    joinConversation: (state,action) => {
      state.activeConversation.id = action.payload
    },
    sendMessage: (state,action) => {
      // state.activeConversation.id = action.payload
    },

    updateMessage: (state,action:{payload:{id:string,status:"SEEN"}}) => {
      // state.activeConversation.id = action.payload
    },

    startConversation: (state,action) => {
      // state.activeConversation.id = action.payload
    },

    recieveMessage: (state,action) => {
      let conversationObj = state.conversations.find(conv => conv._id === action.payload.conversationId);
      if(!conversationObj) {
        return;
      }
      state.conversations = state.conversations.map((convo:any) => {
        if(convo._id === action.payload.conversationId){
          console.log('if')
          return {
            ...convo,
            recentConversations:[...conversationObj.recentConversations,action.payload]
          }
        }else{
          return convo;
        }
      })

    },

    updateMessageState: (state,action) => {
      let conversationObj = state.conversations.find(conv => conv._id === action.payload.conversationId);
      if(!conversationObj) {
        return;
      }

      state.conversations = state.conversations.map((convo:any) => {
        if(convo._id === action.payload.conversationId){
          console.log('if')
          return {
            ...convo,
            recentConversations:conversationObj.recentConversations.map((message) => {
              if(message._id === action.payload._id){
                return action.payload
              }else{
                return message
              }
            })
          }
        }else{
          return convo;
        }
      })
    }
  },
});

export const { setConversations,joinConversation,sendMessage,recieveMessage,setProfile,startConversation,updateMessage,updateMessageState } = conversationSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectAuth = (state:state) => state.auth.conversations;

export default conversationSlice.reducer;