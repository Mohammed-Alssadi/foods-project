import React, { useState, useRef, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Button,
  Container,
  Collapse,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { styled, alpha } from "@mui/material/styles";
import { Link } from "react-router-dom";

// 🔹 تصميم شريط البحث
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  width: "100%",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "20ch",
      "&:focus": {
        width: "30ch",
      },
    },
  },
}));

export default function Header({ search, setSearch }) {
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const inputRef = useRef(null);

  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

const handleSearchChange = (e) => {
  const value = e.target.value;
  if (/[\u0600-\u06FF]/.test(value)) return; // يمنع الأحرف العربية
  if (setSearch) setSearch(value);
};

  // للتركيز على حقل البحث عند الضغط على Ctrl+M
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === "m") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <AppBar position="sticky" color="#D3D5D4" sx={{ backgroundColor: "#9EB9D4", boxShadow: "none",marginBottom: "20px" }} elevation={4} >
        <Container maxWidth="xl">
          <Toolbar
            sx={{
              paddingX: { xs:0, md: 0 },
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            {/* Logo */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography
                variant="h5"
               
                to="/"
                sx={{
                  color: "black",
                  textDecoration: "none",
                  fontWeight: "bold",
                  fontFamily: "serif",
                  textTransform: "uppercase",
                }}
              >
               MealMate
              </Typography>
            </Box>

            {/* 🔸 روابط الشاشات الكبيرة */}
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
              <Button component={Link} to="/" color="inherit">
                Home
              </Button>
              <Button component={Link} to="/meals" color="inherit">
                Meals
              </Button>
              <Button component={Link} to="/categories" color="inherit">
                Categories
              </Button>
            </Box>

            {/* 🔸 البحث وأيقونات المستخدم والمفضلة للشاشات الكبيرة */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                gap: 1,
              }}
            >
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputRef={inputRef}
                  value={search || ""}
                  onChange={handleSearchChange}
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
              <IconButton color="inherit">
                <FavoriteIcon />
              </IconButton>
              <IconButton color="inherit">
                <AccountCircleIcon />
              </IconButton>
            </Box>

            {/* 🔹 أيقونات الشاشات الصغيرة */}
            <Box sx={{ display: { xs: "flex", md: "none" }, gap: 0.5 }}>
              <IconButton
                size="small"
                color="inherit"
                onClick={() => setMobileSearchOpen((prev) => !prev)}
              >
                <SearchIcon />
              </IconButton>
              <IconButton size="small" color="inherit">
                <FavoriteIcon />
              </IconButton>
              <IconButton size="small" color="inherit">
                <AccountCircleIcon />
              </IconButton>
              <IconButton edge="start" color="inherit" sx={{paddingLeft:"15px"}} onClick={handleMenu}>
                <MenuIcon />
              </IconButton>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                <MenuItem component={Link} to="/" onClick={handleClose}>
                  Home
                </MenuItem>
                <MenuItem component={Link} to="/meals" onClick={handleClose}>
                  Meals
                </MenuItem>
                <MenuItem component={Link} to="/categories" onClick={handleClose}>
                  Categories
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>

        {/* 🔻 حقل البحث الصغير يظهر فقط في الموبايل عند الضغط على الأيقونة */}
        <Collapse in={mobileSearchOpen} timeout="auto" unmountOnExit>
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              alignItems: "center",
              px: 2,
              py: 1,
              backgroundColor: "rgba(255,255,255,0.15)",
            }}
          >
            <StyledInputBase
              placeholder="Search…"
              inputRef={inputRef}
              value={search || ""}
              onChange={handleSearchChange}
              inputProps={{ "aria-label": "search" }}
              sx={{ flexGrow: 1 }}
            />
          </Box>
        </Collapse>
      </AppBar>
    </>
  );
}

