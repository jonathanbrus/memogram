import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ui, postsActions } from "../../data/store/actions";

import { authService } from "../../services/authentication";

import {
  AppBar,
  Box,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  Menu,
  LogoutRounded,
  AddRounded,
  SearchRounded,
  FavoriteBorderRounded,
  FavoriteRounded,
} from "@mui/icons-material";

import { Logo } from "./logo";

export const Header = (props) => {
  const { name } = useSelector((state) => state.profile);
  const { favorites } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const openForm = () => dispatch({ type: ui.TOGGLEFORM });

  const openDrawer = () => dispatch({ type: ui.TOGGLEDRAWER });

  const toggleFav = () => dispatch({ type: postsActions.TOGGLE });

  const toSearch = () => navigate("/search");

  return (
    <AppBar sx={{ position: "fixed", zIndex: 1 }}>
      <Container maxWidth="xxl">
        <Toolbar disableGutters>
          <Logo variant="h5" />
          <Box sx={smallNavStyle}>
            <IconButton onClick={openDrawer} sx={iconStyle}>
              <Menu />
            </IconButton>
          </Box>
          <Box sx={fullNavStyle}>
            <IconButton onClick={toSearch} sx={iconStyle}>
              <SearchRounded />
            </IconButton>
            <IconButton onClick={toggleFav} sx={{ color: "red" }}>
              {favorites ? <FavoriteRounded /> : <FavoriteBorderRounded />}
            </IconButton>
            <IconButton onClick={openForm} sx={iconStyle}>
              <AddRounded />
            </IconButton>
            <Typography variant="h6">{name}</Typography>
            <IconButton onClick={authService.signOut} sx={iconStyle}>
              <LogoutRounded />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

const fullNavStyle = {
  flexGrow: 1,
  display: { xs: "none", sm: "flex" },
  alignItems: "center",
  justifyContent: "flex-end",
};

const smallNavStyle = {
  flexGrow: 1,
  display: { xs: "flex", sm: "none" },
  alignItems: "center",
  justifyContent: "flex-end",
};

const iconStyle = { color: "white", margin: "0 0.4rem" };
