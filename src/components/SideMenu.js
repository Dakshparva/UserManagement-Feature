import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Divider,
  Typography,
  createTheme,
  ThemeProvider,
  CssBaseline,
} from "@mui/material";
import { ListAlt, Dashboard, Menu, Close } from "@mui/icons-material";

const SideMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const customTheme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: darkMode ? "#90caf9" : "#1976d2",
      },
      background: {
        default: darkMode ? "#121212" : "#f5f5f5",
      },
    },
  });

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <IconButton
        onClick={toggleDrawer}
        sx={{
          display: { xs: "block", md: "none" },
          position: "absolute",
          top: 10,
          left: 10,
        }}
      >
        <Menu />
      </IconButton>

      <Drawer
        variant="permanent"
        open={isOpen}
        onClose={toggleDrawer}
        sx={{
          width: { xs: isOpen ? 260 : 0, md: 260 },
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 260,
            overflowX: "hidden",
            boxSizing: "border-box",
            background: darkMode
              ? "linear-gradient(to bottom, #333, #555)"
              : "linear-gradient(to bottom, #1976d2, #42a5f5)",
            display: { xs: isOpen ? "block" : "none", md: "block" },
            transition: "width 0.3s ease",
          },
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "10px",
            position: "relative",
          }}
        >
          <Typography
            variant="h6"
            align="center"
            sx={{ color: "white", flex: 1 }}
          >
            User Manager
          </Typography>

          <IconButton
            onClick={toggleDrawer}
            sx={{
              color: "white",
              position: "absolute",
              right: 0,
              display: { xs: "block", md: "none" },
            }}
          >
            <Close />
          </IconButton>
        </div>

        <Divider />
        <List>
          <ListItem button component={Link} to="/" sx={listItemStyle}>
            <ListItemIcon sx={{ color: "white" }}>
              <Dashboard />
            </ListItemIcon>
            <ListItemText primary="Dashboard" sx={textStyle} />
          </ListItem>
          <ListItem button component={Link} to="/user-list" sx={listItemStyle}>
            <ListItemIcon sx={{ color: "white" }}>
              <ListAlt />
            </ListItemIcon>
            <ListItemText primary="User List" sx={textStyle} />
          </ListItem>
        </List>
        <Divider />
      </Drawer>
    </ThemeProvider>
  );
};

const listItemStyle = {
  backgroundColor: "rgba(0, 0, 0, 0.2)",
  margin: "10px",
  borderRadius: "10px",
  transition: "transform 0.2s, background-color 0.3s",
  "&:hover": {
    transform: "scale(1.05)",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
};

const textStyle = {
  color: "white",
  fontWeight: "bold",
};

export default SideMenu;
