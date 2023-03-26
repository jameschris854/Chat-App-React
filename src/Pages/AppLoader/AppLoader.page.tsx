import "./AppLoader.styles.scss";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import Lottie, { Options } from "react-lottie";
import * as progress from "../../assets/lottie/progress.json";
import * as boyChatting from "../../assets/lottie/boyChatting.json";
import * as owl from "../../assets/lottie/logo.json";

const AppLoader = () => {
  const conversations = useSelector(
    (state: any) => state.conversation?.conversations
  );
  const navigation = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      if (conversations) {
        navigation("/conversations");
      }
    }, 3000);
  }, [conversations]);
  return (
    <div className="app-loader-wrapper">
      <div
        className="div"
        style={{ position: "relative", height: "50%", width: "100%" }}
      >
        <Lottie
          options={{
            loop: true,
            autoplay: true,
            animationData: JSON.parse(JSON.stringify(owl)),
            rendererSettings: {
              className: "signin-logo",
            },
          }}
          height={"20%"}
          width={"20%"}
          style={{
            overflow: "hidden",
            margin: "0px auto",
            outline: "none",
            position: "absolute",
            right: "50%",
            transform: "translate(50%,50%)",
          }}
        />
        <Lottie
          style={{ width: "100%", height: "100%" }}
          options={{
            animationData: JSON.parse(JSON.stringify(boyChatting)),
            autoplay: true,
            loop: true,
          }}
        />
      </div>
      <div className="loader-content">
        doing some stuff to get this work ,hold on a moment...
      </div>
      <Lottie
        style={{ width: "15%", height: "15%" }}
        options={{
          animationData: JSON.parse(JSON.stringify(progress)),
          autoplay: true,
          loop: true,
        }}
      />
    </div>
  );
};

export default AppLoader;
