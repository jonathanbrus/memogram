import React, { useState } from "react";
import { authService } from "../../../../services/authentication";
// import { Validator } from "../validator";

import classes from "./index.module.css";

export const SignUp = (props) => {
  const initialState = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [Errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    // setErrors();
    // Validator(formData)

    // let valid;

    // Object.keys(Validator(formData)).length > 0
    //   ? (valid = false)
    //   : (valid = true);

    // valid &&
    authService.signUp({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });
  };

  return (
    <div className={classes.SignUp}>
      <h1>Sign Up</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={(e) => handleChange(e)}
          placeholder="Enter Display Name"
          required
        />
        {Errors.name && <p className={classes.Errors}>{Errors.name}</p>}
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={(e) => handleChange(e)}
          placeholder="Enter Email"
          required
        />
        {Errors.email && <p className={classes.Errors}>{Errors.email}</p>}
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={(e) => handleChange(e)}
          placeholder="Enter Password"
          required
        />
        {Errors.password && <p className={classes.Errors}>{Errors.password}</p>}
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={(e) => handleChange(e)}
          placeholder="Confirm Password"
          required
        />
        {Errors.confirmPassword && (
          <p className={classes.Errors}>{Errors.confirmPassword}</p>
        )}
        <button>Sign Up</button>
      </form>
      <p>
        Already have an account Sign In!
        <span onClick={props.toggle}> Sign In </span>
      </p>
    </div>
  );
};
