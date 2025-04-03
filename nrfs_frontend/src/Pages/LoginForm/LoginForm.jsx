import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    const tempErrors = {};
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      tempErrors.email = "Invalid email";
    if (formData.password.length < 8)
      tempErrors.password = "Password must be at least 8 characters";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const API = import.meta.env.VITE_API_URL;
      const response = await axios.post(`${API}/api/users/login`, formData);
      console.log("User Logged In:", response.data);
      localStorage.setItem("authToken", response.data.token);
      navigate("/profile");
    } catch (error) {
      console.error("Login failed:", error.response?.data || error);
      setErrors({ apiError: error.response?.data?.message || "Invalid credentials" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <Typography variant="h4" color="primary" gutterBottom>
          Log In
        </Typography>
      </Box>

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <TextField
          fullWidth label="Email" name="email"
          value={formData.email} onChange={handleChange}
          error={!!errors.email} helperText={errors.email} margin="normal"
        />
        <TextField
          fullWidth type="password" label="Password" name="password"
          value={formData.password} onChange={handleChange}
          error={!!errors.password} helperText={errors.password} margin="normal"
        />

        {errors.apiError && (
          <Typography color="error" sx={{ mt: 1 }}>
            {errors.apiError}
          </Typography>
        )}

        <Box sx={{ textAlign: "center", mt: 3 }}>
          <Button type="submit" variant="contained" color="primary" disabled={loading}>
            {loading ? "Logging In..." : "Log In"}
          </Button>
        </Box>

        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Don't have an account?{" "}
          <Button color="secondary" onClick={() => navigate("/signin")}>
            Sign Up
          </Button>
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;
