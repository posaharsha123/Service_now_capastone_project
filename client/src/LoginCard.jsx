import React from "react";
import { Box, Card, CardContent, Typography, Button } from "@mui/material";

export default function LoginCard({ isLogged, handleLogin }) {
  if (isLogged) return null;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to right, #1e3c72, #2a5298)", // soft blue gradient
      }}
    >
      <Card
        sx={{
          width: 380,
          borderRadius: 4,
          boxShadow: "0px 8px 20px rgba(0,0,0,0.25)",
          textAlign: "center",
          p: 2,
          backgroundColor: "#ffffff",
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            fontWeight="bold"
            gutterBottom
            sx={{ color: "#0d47a1" }}   // dark blue title
          >
            Welcome Back 👋
          </Typography>

          <Typography
            variant="body2"
            sx={{ mb: 3, color: "#546e7a" }}   // soft grey description
          >
            Please log in to continue
          </Typography>

          <Button
            variant="contained"
            size="large"
            sx={{
              borderRadius: 3,
              px: 4,
              py: 1.2,
              textTransform: "none",
              fontWeight: "bold",
              backgroundColor: "#1976d2",
              ":hover": { backgroundColor: "#115293" }, // smooth hover
            }}
            onClick={handleLogin}
          >
            Log In
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
