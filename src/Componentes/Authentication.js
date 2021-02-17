import React, { useState } from "react";
import { firebaseAuth } from "../firebase";
import { Redirect } from "react-router-dom";

const Authentication = (props) => {
  const [loggedin, setloggedin] = useState(null);
  firebaseAuth.onAuthStateChanged((user) => {
    if (user) {
      setloggedin(true);
    } else {
      setloggedin(false);
    }
  });
  if (props.nonAuthentication) {
    if (loggedin == null) {
      return "Loading...";
    } else if (!loggedin) {
      return props.children;
    } else if (loggedin) {
      return <Redirect to="/" />;
    }
  } else {
    if (loggedin == null) {
      return "Loading...";
    } else if (loggedin) {
      return props.children;
    } else if (!loggedin) {
      return <Redirect to="/login" />;
    }
  }
};

export default Authentication;
