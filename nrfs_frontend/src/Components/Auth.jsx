import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Container,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";
import { styled } from "@mui/system";

const FormContainer = styled(Paper)({
  padding: "30px",
  borderRadius: "8px",
  boxShadow: "0px 4px 10px rgba(0,0,0,0.15)",
  maxWidth: "450px",
  margin: "auto",
  marginTop: "50px",
  textAlign: "center",
});

const Auth = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("Email and Password are required.");
      return;
    }
    if (!isLogin && !formData.username) {
      setError("Username is required for Signup.");
      return;
    }
    setError("");
    setSuccess(true);

    console.log(isLogin ? "Logging In..." : "Signing Up...", formData);
  };

  return (
    <Container>
      <FormContainer elevation={3}>
        <Typography variant="h5" gutterBottom>
          {isLogin ? "Sign In" : "Sign Up"}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {!isLogin && (
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                {isLogin ? "Sign In" : "Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
        <Typography
          variant="body2"
          sx={{ cursor: "pointer", color: "blue", marginTop: "10px" }}
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
        </Typography>
      </FormContainer>

      {/* Snackbar for Success/Error Messages */}
      <Snackbar
        open={error !== ""}
        autoHideDuration={4000}
        onClose={() => setError("")}
      >
        <Alert severity="error">{error}</Alert>
      </Snackbar>

      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={() => setSuccess(false)}
      >
        <Alert severity="success">
          {isLogin ? "Login Successful!" : "Signup Successful!"}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Auth;
