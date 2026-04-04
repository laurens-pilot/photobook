"use client";

import { Box, CircularProgress, Snackbar, Alert, Button } from "@mui/material";
import { BookProvider, useBook } from "@/context/BookContext";
import NavBar from "@/components/NavBar";
import StartPage from "@/components/StartPage";
import EditPage from "@/components/EditPage";
import ResultsPage from "@/components/ResultsPage";

function AppContent() {
  const { appView, loading, restored, setRestored, startOver } = useBook();

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress sx={{ color: "#08C225" }} />
      </Box>
    );
  }

  return (
    <>
      <NavBar />
      {appView === "start" && <StartPage />}
      {appView === "edit" && <EditPage />}
      {appView === "results" && <ResultsPage />}

      {/* Session restored banner */}
      <Snackbar
        open={restored}
        autoHideDuration={8000}
        onClose={() => setRestored(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          severity="success"
          onClose={() => setRestored(false)}
          sx={{
            bgcolor: "white",
            color: "#1a1c1d",
            boxShadow: "0px 12px 32px rgba(26, 28, 29, 0.1)",
            "& .MuiAlert-icon": { color: "#08C225" },
          }}
          action={
            <Button
              size="small"
              onClick={startOver}
              sx={{ color: "#ba1a1a", fontWeight: 600 }}
            >
              Start over
            </Button>
          }
        >
          Welcome back — your book has been restored.
        </Alert>
      </Snackbar>
    </>
  );
}

export default function AppShell() {
  return (
    <BookProvider>
      <AppContent />
    </BookProvider>
  );
}
