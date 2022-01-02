import React, { useState } from "react";
import { authService } from "../../../../services/authentication";

import classes from "./index.module.css";

export const SignIn = (props) => {
  const initialState = {
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    authService.signIn({ email: formData.email, password: formData.password });
  };

  return (
    <div className={classes.SignIn}>
      <h1>Sign In</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={(e) => handleChange(e)}
          placeholder="Enter Email"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={(e) => handleChange(e)}
          placeholder="Enter Password"
          required
        />
        <button>Sign In</button>
        <button
          onClick={(e) => {
            e.preventDefault();
            authService.signIn({ google: true }).then();
          }}
        >
          Sign In With Google
        </button>
      </form>
      <p>
        Don't have an account Sign Up now!
        <span onClick={props.toggle}> Sign Up </span>
      </p>
    </div>
  );
};
