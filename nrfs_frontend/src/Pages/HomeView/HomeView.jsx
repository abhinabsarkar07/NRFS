import { Container, Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md">
      {/* Header Section */}
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <Typography variant="h3" color="primary" gutterBottom>
          Welcome to Train Reservation System
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Book your train tickets with ease and convenience.
        </Typography>
      </Box>

      {/* Action Buttons */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4, gap: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/booking")}
        >
          Book Now
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
      </Box>
    </Container>
  );
};

export default Home;
