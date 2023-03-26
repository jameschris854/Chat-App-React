import axios from "axios";
import React, { useState, useEffect, memo } from "react";
import { useDispatch } from "react-redux";
import { setAuthToken } from "../../redux/features/auth/authSlice";
import "../Signin/Signin.styles.scss";
import { Link, useNavigate } from "react-router-dom";
import Lottie, { LottieProps, Options } from "react-lottie";
import * as animationData from "../../assets/lottie/logo.json";
import * as abstract from "../../assets/lottie/abstract.json";
import quotesResource from "../../assets/quotes/quotes.json";


const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [quote, setQuote] = useState<{ text: string; author: any; }>();
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    let timer: NodeJS.Timer;
    const init = async () => {
      if (quotesResource) {
        clearInterval(timer);
        let i = 0;
        timer = setInterval(() => {
          if (i >= quotesResource?.length - 1) {
            i = 0;
          } else {
            i++;
          }
          setQuote(quotesResource[i]);
        }, 5000);
      }
    };
    init();
    return () => {
      clearInterval(timer);
    };
  }, []);

  const onSubmit = (e) => {
    e.preventDefault()
    setLoader(true);
    axios
      .post(`${process.env.REACT_APP_DOMAIN}/api/v1/accounts/login`, {
        email: email,
        password: password,
      })
      .then(function (response) {
        console.log(response.data.token);
        dispatch(setAuthToken(response.data.token));
        navigate("/sync");
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  const defaultOptions : Options = {
    loop: true,
    autoplay: true,
    animationData: JSON.parse(JSON.stringify(animationData)),
    rendererSettings:{
      className:'signin-logo'
    }
  };

  const abstractOptions: Options = {
    loop: true,
    autoplay: true,
    animationData: JSON.parse(JSON.stringify(abstract)),
  };

  return (
    <div className="signin-wrapper">
      <div className="signin-section left">
        <Lottie
          speed={0.5}
          options={abstractOptions}
          height={"50%"}
          width={"50%"}
        />
        {quote ? (
          <div className="quote-container">
            <div className="quote">{quote.text}</div>
            <div className="quote-author"> - {quote.author}</div>
          </div>
        ) : null}
      </div>
      <div className="signin-section right">
        <div className="signin-form-container">
          <form onSubmit={onSubmit} className="signin-form">
          <Lottie options={defaultOptions} height={"20%"} width={"20%"}
          style={{
            overflow: 'hidden',
            margin: '0px auto',
            outline: 'none',
            position: 'absolute',
            top: '-43px',
            right: '50%',
            transform: 'translateX(50%)'
          }}
           />
            <input 
            placeholder="email" 
            type={"email"} 
            onChange={(e) => setEmail(e.target.value)}
            />
            <input 
            placeholder="password" 
            type={"password"} 
            onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Submit</button>
            <div className="no-account">if you dont have an account ? <Link  to={"/signup"}> Signup </Link></div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default memo(Signin);
