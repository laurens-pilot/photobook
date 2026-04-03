"use client";

import { Box, Typography, Link } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#F5F5F7",
        py: 4,
        borderTop: "1px solid rgba(0,0,0,0.04)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1.5,
      }}
    >
      <Box sx={{ display: "flex", gap: 4 }}>
        <Link
          href="#"
          underline="hover"
          sx={{
            fontFamily: "'Noto Serif', serif",
            fontStyle: "italic",
            fontSize: "0.85rem",
            color: "#999",
          }}
        >
          Privacy Policy
        </Link>
        <Link
          href="#"
          underline="hover"
          sx={{
            fontFamily: "'Noto Serif', serif",
            fontStyle: "italic",
            fontSize: "0.85rem",
            color: "#999",
          }}
        >
          Help Center
        </Link>
      </Box>
      <Typography
        sx={{
          fontFamily: "'Noto Serif', serif",
          fontStyle: "italic",
          fontSize: "0.75rem",
          color: "#aaa",
        }}
      >
        &copy; 2024 Ente Photobook. Handcrafted for your memories.
      </Typography>
    </Box>
  );
}
