import React, { useState } from "react";
import { TextField, Button, Grid, Typography, Container, FormControlLabel, Checkbox } from "@mui/material";
import { styled } from "@mui/system";

// Styled container for better spacing
const FormContainer = styled("div")({
  padding: "20px",
  borderRadius: "8px",
  backgroundColor: "#f9f9f9",
  boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
  maxWidth: "600px",
  margin: "auto",
});

const Booking = () => {
  // State management
  const [bookingData, setBookingData] = useState({
    name: "",
    age: "",
    departure: "",
    destination: "",
    date: "",
    returnDate: "",
    roundTrip: false,
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBookingData({
      ...bookingData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking Details:", bookingData);
  };

  return (
    <Container>
      <FormContainer>
        <Typography variant="h5" align="center" gutterBottom>
          Book Your Trip
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={bookingData.name}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Age"
                name="age"
                type="number"
                value={bookingData.age}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Departure"
                name="departure"
                value={bookingData.departure}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Destination"
                name="destination"
                value={bookingData.destination}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Date of Travel"
                name="date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={bookingData.date}
                onChange={handleChange}
                required
              />
            </Grid>

            {/* Round Trip Checkbox */}
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="roundTrip"
                    checked={bookingData.roundTrip}
                    onChange={handleChange}
                  />
                }
                label="Round Trip?"
              />
            </Grid>

            {/* Return Date - Conditional Field */}
            {bookingData.roundTrip && (
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Return Date"
                  name="returnDate"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={bookingData.returnDate}
                  onChange={handleChange}
                />
              </Grid>
            )}

            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Book Now
              </Button>
            </Grid>
          </Grid>
        </form>
      </FormContainer>
    </Container>
  );
};

export default Booking;
