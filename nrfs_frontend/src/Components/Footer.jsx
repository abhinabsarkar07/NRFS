import {
    Box,
    Typography,
    Link,
    Container,
    Divider,
    Stack,
  } from "@mui/material";
  
  const footerLinks = [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ];
  
  const Footer = () => {
    const currentYear = new Date().getFullYear();
  
    return (
      <Box
        component="footer"
        sx={{
          backgroundColor: "#111",
          color: "#eee",
          py: 4,
          borderTop: "1px solid #333",
          mt: "auto", // Ensure footer pushes down
        }}
      >
        <Container maxWidth="lg">
          {/* Divider for separation */}
          <Divider sx={{ borderColor: "#444", mb: 3 }} />
  
          {/* Navigation Links */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="center"
            alignItems="center"
            spacing={2}
            sx={{ mb: 2 }}
          >
            {footerLinks.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                underline="hover"
                color="inherit"
                sx={{
                  fontSize: "0.95rem",
                  transition: "color 0.2s ease",
                  "&:hover": { color: "#90caf9" },
                }}
              >
                {label}
              </Link>
            ))}
          </Stack>
  
          {/* Copyright */}
          <Typography
            variant="caption"
            align="center"
            display="block"
            sx={{ fontSize: "0.8rem", opacity: 0.75 }}
          >
            © {currentYear} Trip Planner. All rights reserved.
          </Typography>
        </Container>
      </Box>
    );
  };
  
  export default Footer;
  