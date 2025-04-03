import { useState } from "react";
import { Container, TextField, Button, Typography, FormControlLabel, Checkbox, Box } from "@mui/material";
import axios from "axios";

const BookingView = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    departure: "",
    destination: "",
    travelDate: "",
    returnDate: "",
    roundTrip: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCheckboxChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      roundTrip: e.target.checked,
      returnDate: e.target.checked ? prev.returnDate : "",
    }));
  };

  const validate = () => {
    const tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = "Name is required";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      tempErrors.email = "Invalid email format";
    if (!formData.phone.match(/^\d{10}$/)) tempErrors.phone = "Invalid phone number";
    if (!formData.departure.trim()) tempErrors.departure = "Departure location required";
    if (!formData.destination.trim()) tempErrors.destination = "Destination required";
    if (!formData.travelDate) tempErrors.travelDate = "Travel date is required";
    if (formData.roundTrip && !formData.returnDate)
      tempErrors.returnDate = "Return date required for round trips";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const response = await axios.post("/api/booking", formData);
      console.log("Booking Successful:", response.data);
      alert("Your booking has been confirmed!");
    } catch (error) {
      console.error("Booking failed:", error.response?.data || error);
      setErrors({ apiError: error.response?.data?.message || "Booking failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <Typography variant="h4" color="primary" gutterBottom>
          Book Your Trip
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
          fullWidth label="Phone Number" name="phone"
          value={formData.phone} onChange={handleChange}
          error={!!errors.phone} helperText={errors.phone} margin="normal"
        />
        <TextField
          fullWidth label="Departure City" name="departure"
          value={formData.departure} onChange={handleChange}
          error={!!errors.departure} helperText={errors.departure} margin="normal"
        />
        <TextField
          fullWidth label="Destination City" name="destination"
          value={formData.destination} onChange={handleChange}
          error={!!errors.destination} helperText={errors.destination} margin="normal"
        />
        <TextField
          fullWidth type="date" label="Travel Date" name="travelDate"
          InputLabelProps={{ shrink: true }}
          value={formData.travelDate} onChange={handleChange}
          error={!!errors.travelDate} helperText={errors.travelDate} margin="normal"
        />

        <FormControlLabel
          control={<Checkbox checked={formData.roundTrip} onChange={handleCheckboxChange} />}
          label="Round Trip"
        />

        {formData.roundTrip && (
          <TextField
            fullWidth type="date" label="Return Date" name="returnDate"
            InputLabelProps={{ shrink: true }}
            value={formData.returnDate} onChange={handleChange}
            error={!!errors.returnDate} helperText={errors.returnDate} margin="normal"
          />
        )}

        {errors.apiError && (
          <Typography color="error" sx={{ mt: 1 }}>
            {errors.apiError}
          </Typography>
        )}

        <Box sx={{ textAlign: "center", mt: 3 }}>
          <Button type="submit" variant="contained" color="primary" disabled={loading}>
            {loading ? "Booking..." : "Confirm Booking"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default BookingView;
