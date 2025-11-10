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
        background: "linear-gradient(to right, #1976d2, #42a5f5)",
      }}
    >
      <Card
        sx={{
          width: 380,
          borderRadius: 4,
          boxShadow: "0px 8px 20px rgba(0,0,0,0.2)",
          textAlign: "center",
          p: 2,
          backgroundColor: "#fff",
        }}
      >
        <CardContent>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Welcome Back 👋
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
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
