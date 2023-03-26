import React, { useEffect } from "react";
import {
  Route, Routes, useNavigate, useNavigation,
} from "react-router-dom";
import AppLoader from "../Pages/AppLoader/AppLoader.page";
import Conversation from "../Pages/Conversation/Conversation.page";

import Signin from "../Pages/Signin/SignIn.page";
import Signup from "../Pages/Signup/Signup.page";

const RoutesComponent = () => {


    const Initial = () => {
      const navigate = useNavigate()

      useEffect(() => {
        navigate("/signin")
      },[])

      return null
    }

    return (
      <Routes>
        <Route path="/" element={<Initial />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/sync" element={<AppLoader />} />
        <Route path="/conversations" element={<Conversation />} />
          {/* <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="dashboard" element={<Dashboard />} /> */}

          {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
          {/* <Route path="*" element={<NoMatch />} /> */}
      </Routes>
    )
}

export default RoutesComponent;