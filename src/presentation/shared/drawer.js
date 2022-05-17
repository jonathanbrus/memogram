import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  Drawer,
  IconButton,
  Toolbar,
  Box,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemButton,
} from "@mui/material";
import {
  LogoutRounded,
  AddRounded,
  SearchRounded,
  FavoriteBorderRounded,
} from "@mui/icons-material";
import ChevronRightRounded from "@mui/icons-material/ChevronRightRounded";

import { postsActions, ui } from "../../data/store/actions";
import { authService } from "../../services/authentication";

export const AppDrawer = (props) => {
  const navigate = useNavigate();

  const { drawer } = useSelector((state) => state.ui);
  const { name } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const closeDrawer = () => dispatch({ type: ui.TOGGLEDRAWER });

  const openForm = () => {
    closeDrawer();
    dispatch({ type: ui.TOGGLEFORM });
  };

  const showFav = () => {
    closeDrawer();
    dispatch({ type: postsActions.TOGGLE });
  };

  const toSearch = () => {
    closeDrawer();
    navigate("/search");
  };

  return (
    <Drawer anchor="right" open={drawer} onClose={closeDrawer}>
      <Box sx={drawerStyle}>
        <Toolbar sx={{ paddingLeft: "0.5rem" }}>
          <IconButton onClick={closeDrawer} sx={{ color: "white" }}>
            <ChevronRightRounded />
          </IconButton>
        </Toolbar>
        <Divider />
        <List sx={{ padding: "10px" }}>
          <ListItem disablePadding sx={centerd}>
            <Typography variant="h5" sx={titleStyle}>
              {name}
            </Typography>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={toSearch} sx={centerd}>
              <Typography sx={textStyle}>Search</Typography>
              <SearchRounded sx={iconStyle} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={openForm} sx={centerd}>
              <Typography sx={textStyle}>Create New Memory</Typography>
              <AddRounded sx={iconStyle} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={showFav} sx={centerd}>
              <Typography sx={textStyle}>Favorites</Typography>
              <FavoriteBorderRounded fontSize="small" sx={iconStyle} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={authService.signOut} sx={centerd}>
              <Typography sx={textStyle}>Sign Out</Typography>
              <LogoutRounded fontSize="small" sx={iconStyle} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

const centerd = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const drawerStyle = {
  height: "100%",
  width: "80vw",
  maxWidth: "400px",
  backgroundColor: "#262626",
};

const titleStyle = {
  padding: "0 1rem",
  marginBottom: "1rem",
  color: "#1976D2",
  borderBottom: "4px solid #1976D2",
};

const textStyle = { color: "white", paddingRight: "0.5rem" };

const iconStyle = { color: "white" };
