import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { joinConversation } from "../../redux/features/conversation/conversationSlice";
import UserUtil from "../../utils/UserUtil";
import "./ConversationList.styles.scss";

const ConversationList = ({ setConvo }: any) => {
  const dispatch = useDispatch();
  const conversations = useSelector(
    (state: any) => state.conversation?.conversations
  );
  const profile = useSelector((state: any) => state.conversation?.profile);
  const joinConvo = (data: any) => {
    setConvo(data);
    dispatch(joinConversation(data.id));
  };
  return (
    <div className="recent-conversations-container">
      <div className="conversations-title">My Conversations</div>
      <div className="conversation-search-container conversation-card">
        <i className="fa-solid fa-magnifying-glass"></i>
        <input
          type="text"
          className="conversation-search"
          inputMode="search"
          placeholder="Search"
        />
      </div>
      {conversations?.map((data: any) => {
        console.log(data, "data");
        const user = UserUtil.getOtherUserFromMemberList(data.members, profile);
        console.log(profile,data.members)
        const time = new Date(user.lastSeen).toLocaleTimeString();
        return (
          <div
            className="conversation-item conversation-card"
            onClick={joinConvo.bind(this, data)}
          >
            <div className="profile-pic">
              <i className="fa-regular fa-user"></i>
            </div>
            <div className="convo-content">
              <div className="conversation-item-row one">
                <div>{user.name}</div>
                <div className="time">{time}</div>
              </div>
              <div className="conversation-item-row two">
                {data.recentConversations[0] ? (
                  <div>{data.recentConversations[0].content}</div>
                ) : null}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ConversationList;
