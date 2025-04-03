import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  // Check if user is logged in (from localStorage or API)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  // Mobile Menu Handling
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Brand Name */}
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ textDecoration: "none", color: "#fff", fontWeight: "bold" }}
        >
          Trip Planner
        </Typography>

        {/* Desktop Navigation Links */}
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <Button component={Link} to="/booking" sx={{ color: "#fff" }}>
            Book Now
          </Button>
          {user ? (
            <>
              <Button component={Link} to="/profile" sx={{ color: "#fff" }}>
                Profile
              </Button>
              <Button onClick={handleLogout} sx={{ color: "#fff" }}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button component={Link} to="/login" sx={{ color: "#fff" }}>
                Login
              </Button>
              <Button component={Link} to="/signup" sx={{ color: "#fff" }}>
                Sign Up
              </Button>
            </>
          )}
        </Box>

        {/* Mobile Menu Button */}
        <IconButton
          sx={{ display: { xs: "block", md: "none" }, color: "#fff" }}
          onClick={handleMenuOpen}
        >
          <MenuIcon />
        </IconButton>

        {/* Mobile Dropdown Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          {[
            <MenuItem
              key="booking"
              component={Link}
              to="/booking"
              onClick={handleMenuClose}
            >
              Book Now
            </MenuItem>,
            ...(user
              ? [
                  <MenuItem
                    key="profile"
                    component={Link}
                    to="/profile"
                    onClick={handleMenuClose}
                  >
                    Profile
                  </MenuItem>,
                  <MenuItem
                    key="logout"
                    onClick={() => {
                      handleLogout();
                      handleMenuClose();
                    }}
                  >
                    Logout
                  </MenuItem>,
                ]
              : [
                  <MenuItem
                    key="login"
                    component={Link}
                    to="/login"
                    onClick={handleMenuClose}
                  >
                    Login
                  </MenuItem>,
                  <MenuItem
                    key="signup"
                    component={Link}
                    to="/signup"
                    onClick={handleMenuClose}
                  >
                    Sign Up
                  </MenuItem>,
                ]),
          ]}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
