import React, { useEffect } from "react";
import { Toolbar } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { authService } from "../../services/authentication";

import { setStatus } from "../../data/store/actions/creators/authentication";
import { setProfile } from "../../data/store/actions/creators/profile";
import { initialFetch } from "../../data/store/actions/creators/post";

import { Authentication } from "./authentication/index";
import { Header } from "../shared/header";
import { Form } from "../shared/form";
import { AppDrawer } from "../shared/drawer";

export const AppContainer = (props) => {
  const { form } = useSelector((state) => state.ui);
  const { authenticated } = useSelector((state) => state.authentication);

  const dispatch = useDispatch();

  useEffect(() => {
    authService.observer({
      setAuthStatus: (status) => dispatch(setStatus({ status })),
      setUser: (user) => dispatch(setProfile(user)),
      initFetch: (uid) => dispatch(initialFetch({ uid })),
    });
  }, [dispatch]);

  if (!authenticated) return <Authentication />;

  return (
    <>
      <Header />
      <Toolbar />
      <AppDrawer />
      {form && <Form />}
      {props.children}
    </>
  );
};
