import axios from "axios";
import React, { useState, useEffect, memo } from "react";
import { useDispatch } from "react-redux";
import { setAuthToken } from "../../redux/features/auth/authSlice";
import "../Signup/Signup.styles.scss";
import { useNavigate } from "react-router-dom";
import Lottie, { Options } from "react-lottie";
import * as animationData from "../../assets/lottie/logo.json";
import * as abstract from "../../assets/lottie/abstract.json";


const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [quote, setQuote] = useState<{ text: string; author: any; }>();
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault()
    if(password !== passwordConfirm){
      return alert('confirm password is not same as password!')
    }
    setLoader(true);
    axios
      .post(`${process.env.REACT_APP_DOMAIN}/api/v1/accounts/signup`, {
        email: email,
        password: password,
        name:name,
        passwordConfirm:passwordConfirm
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
      className:'signup-logo',
      progressiveLoad:true
    }
  };

  const abstractOptions: Options = {
    loop: true,
    autoplay: true,
    rendererSettings:{
      progressiveLoad:true
    },
    animationData: JSON.parse(JSON.stringify(abstract)),
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-section left">
        <Lottie
          speed={0.5}
          options={abstractOptions}
          height={"50%"}
          width={"50%"}
        />
        
          <div className="quote-container">
            <div className="quote">Create a new account</div>
            <div className="quote-author"> - chatjii</div>
          </div>
       
      </div>
      <div className="signup-section right">
        <div className="signup-form-container">
          <form onSubmit={onSubmit} className="signup-form">
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
            placeholder="Name" 
            type={"text"} 
            name="Name"
            onChange={(e) => setName(e.target.value)}
            inputMode="text"
            autoFocus
            required
            />
            <input 
            placeholder="Email" 
            type={"email"} 
            name="Email"
            onChange={(e) => setEmail(e.target.value)}
            inputMode="email"
            required
            />
            <input 
            placeholder="Password" 
            type={"password"} 
            name="Password"
            onChange={(e) => setPassword(e.target.value)}
            inputMode="text"
            required
            />
            <input 
            placeholder="Confirm Password" 
            type={"password"} 
            name="Password"
            onChange={(e) => setPasswordConfirm(e.target.value)}
            inputMode="text"
            required
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default memo(Signup);
