import { useState } from "react";
import { Container, Box, TextField, Button, Typography } from "@mui/material";

const ProfileForm = () => {
  // Mock user data (can be replaced with API data)
  const [userData, setUserData] = useState({
    name: "John Doe",
    age: "25",
    email: "johndoe@example.com",
    phone: "+1234567890",
    city: "New York",
  });

  const [isEditing, setIsEditing] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  // Handle form submission (save changes)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Profile:", userData);
    setIsEditing(false);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <Typography variant="h4" color="primary" gutterBottom>
          Profile
        </Typography>
      </Box>

      {/* Profile Form */}
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <TextField
          fullWidth
          label="Full Name"
          name="name"
          value={userData.name}
          onChange={handleChange}
          disabled={!isEditing}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Age"
          name="age"
          type="number"
          value={userData.age}
          onChange={handleChange}
          disabled={!isEditing}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          disabled={!isEditing}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Phone"
          name="phone"
          value={userData.phone}
          onChange={handleChange}
          disabled={!isEditing}
          margin="normal"
        />
        <TextField
          fullWidth
          label="City"
          name="city"
          value={userData.city}
          onChange={handleChange}
          disabled={!isEditing}
          margin="normal"
        />

        {/* Buttons */}
        <Box sx={{ textAlign: "center", mt: 3 }}>
          {isEditing ? (
            <Button type="submit" variant="contained" color="primary">
              Save Changes
            </Button>
          ) : (
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </Button>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default ProfileForm;
