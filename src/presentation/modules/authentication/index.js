import React, { useState } from "react";

import { SignIn } from "./sign_in";
import { SignUp } from "./sign_up";
import { Logo } from "../../shared/logo";
import classes from "./index.module.css";

export const Authentication = (props) => {
  const [toggle, setToggle] = useState(true);

  return (
    <div className={classes.Authentication}>
      <div></div>
      <div>
        <Logo variant="h4" />
        {toggle ? (
          <SignIn toggle={() => setToggle((prev) => !prev)} />
        ) : (
          <SignUp toggle={() => setToggle((prev) => !prev)} />
        )}
      </div>
    </div>
  );
};
