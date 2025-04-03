import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import axios from "axios";

const SigninForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    const tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = "Name is required";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      tempErrors.email = "Invalid email format";
    if (formData.password.length < 8)
      tempErrors.password = "Password must be at least 8 characters";
    if (formData.password !== formData.confirmPassword)
      tempErrors.confirmPassword = "Passwords do not match";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const API = import.meta.env.VITE_API_URL;
      const response = await axios.post(`${API}/api/users/register`, formData);
      console.log("User Registered:", response.data);
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error.response?.data || error);
      setErrors({
        apiError: error.response?.data?.message || "Registration failed",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <Typography variant="h4" color="primary" gutterBottom>
          Create an Account
        </Typography>
      </Box>

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <TextField
          fullWidth label="Full Name" name="name"
          value={formData.name} onChange={handleChange}
          error={!!errors.name} helperText={errors.name} margin="normal"
        />
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
        <TextField
          fullWidth type="password" label="Confirm Password" name="confirmPassword"
          value={formData.confirmPassword} onChange={handleChange}
          error={!!errors.confirmPassword} helperText={errors.confirmPassword} margin="normal"
        />

        {errors.apiError && (
          <Typography color="error" sx={{ mt: 1 }}>
            {errors.apiError}
          </Typography>
        )}

        <Box sx={{ textAlign: "center", mt: 3 }}>
          <Button type="submit" variant="contained" color="primary" disabled={loading}>
            {loading ? "Registering..." : "Sign Up"}
          </Button>
        </Box>

        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Already have an account?{" "}
          <Button color="secondary" onClick={() => navigate("/login")}>
            Log In
          </Button>
        </Typography>
      </Box>
    </Container>
  );
};

export default SigninForm;
