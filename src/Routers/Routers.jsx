import React, { useEffect } from "react";

import { useDispatch } from "react-redux";
import { useAuth } from "../Auth/AuthContext";
import { validateToken } from "../State/Auth/Action";
import LoggedInRouters from "./LoggedInRouters";
import LoggedOutRouters from "./LoggedOutRouters";

const Routers = () => {
  const { isAuthenticated, logout } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      dispatch(validateToken(jwt)).then(isValid => {
        if (!isValid) {
          logout(); // Call the logout function if the token is invalid
        }
      });
    }
  }, []);

  return (
    <div>
      {isAuthenticated ? <LoggedInRouters /> :
        <LoggedOutRouters />
      }
    </div>
  );
};

export default Routers;
