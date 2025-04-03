import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom"; // ❌ Removed BrowserRouter
import { CssBaseline, CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import Navbar from "./Components/NavBar";
import Footer from "./Components/Footer";
import "./Global/GlobalStyle.css";

// Lazy loading components
const Home = lazy(() => import("./Pages/HomeView/HomeView"));
const BookingView = lazy(() => import("./Pages/BookingView/BookingView"));
const ProfileForm = lazy(() => import("./Pages/ProfileForm/ProfileForm"));
const SigninForm = lazy(() => import("./Pages/SigninForm/SiginForm"));
const LoginForm = lazy(() => import("./Pages/LoginForm/LoginForm"));

const App = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <Box sx={{ flex: 1 }}> {/* Pushes footer to bottom */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/booking" element={<BookingView />} />
          <Route path="/profile" element={<ProfileForm />} />
          <Route path="/signin" element={<SigninForm />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </Box>
      <Footer />
    </Box>
  );
};

// Reusable Loading Indicator
const LoadingIndicator = () => (
  <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
    <CircularProgress />
  </div>
);

export default App;
