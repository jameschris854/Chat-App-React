import React, { createRef, memo, useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../../redux/features/conversation/conversationSlice";
import UserUtil from "../../utils/UserUtil";
import "./ChatArea.styles.scss";

const ChatArea = () => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const profile = useSelector((state: any) => state.conversation?.profile);
  const scrollRef = useRef<typeof HTMLDivElement>();

  //active conversation object
  const selectedConvo = useSelector((state: any) => {
    const activeConoId = state.conversation?.activeConversation
    let allConversations = state.conversation?.conversations
    return allConversations.find((data:any) => data.id === activeConoId.id);
  })
  
  const otherUser = selectedConvo && UserUtil.getOtherUserFromMemberList(
    selectedConvo?.members,
    profile
  );

  const time = new Date(otherUser?.lastSeen).toLocaleTimeString();

  const submitMessage = useCallback(() => {
    dispatch(sendMessage(message));
    setMessage("");
  }, [setMessage,message]);

  useEffect(() => {
    console.log(scrollRef.current)
    scrollRef.current?.scrollTo(0,scrollRef.current.scrollHeight)
  }, [selectedConvo])
  
  if (!selectedConvo) return <div className="no-convo">No Conversations</div>;

  return (
    <div className="chatarea-wrapper">
      <div className="chatarea-header">
        <div className="chatarea-item">
          <div className="profile-pic">
            <i className="fa-regular fa-user"></i>
          </div>
          <div className="convo-content">
            <div className="chatarea-item-row one">
              <div>{otherUser?.name}</div>
              <div className="time">{time}</div>
            </div>
          </div>
        </div>
      </div>

      <div ref={scrollRef} className="chatarea-conversations">
        {selectedConvo.recentConversations.map((conv) => {
          const isSender = conv.sender === profile._id;
          return (
            <div className={`chatarea-message ${isSender ? "self" : ""}`}>
              {conv.content}
            </div>
          );
        })}
      </div>

      <div className="chatarea-footer">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          inputMode="text"
          placeholder="Say Something"
        />
        <div className="send-button" onClick={submitMessage}>
          <i className="fa-solid fa-paper-plane button"></i>
        </div>
      </div>
    </div>
  );
};

export default memo(ChatArea);
