import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./Conversation.styles.scss";
import Lottie from "react-lottie";
import * as animationData from "../../assets/lottie/logo.json";
import ConversationList from "../../components/ConversationList/ConversationList.component";
import ChatArea from "../../components/ChatArea/ChatArea.component";

const Conversation = () => {
  const [selectedConvo, setConvo] = useState();

  return (
    <div className="conversation-wrapper">
      <div className="left-navbar">
        <div className="nav-logo">
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: JSON.parse(JSON.stringify(animationData)),
              rendererSettings: {
                className: "signin-logo",
              },
            }}
            height={"70%"}
            width={"70%"}
          />
        </div>
        <i className="fa-regular fa-message nav-item"></i>
        <i className="fa-regular fa-user profile-pic"></i>
      </div>
      <ConversationList setConvo={setConvo} />
      <ChatArea />
    </div>
  );
};

export default Conversation;
