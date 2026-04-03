"use client";

import { useCallback, useRef, useState } from "react";
import {
  Box,
  Button,
  Typography,
  LinearProgress,
  CircularProgress,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import ShieldIcon from "@mui/icons-material/Shield";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useBook } from "@/context/BookContext";
import Footer from "./Footer";

const ACCEPTED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
];

const MAX_PHOTOS = 400;

export default function StartPage() {
  const { addPhotos, processingPhotos, processingProgress } = useBook();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFiles = useCallback(
    (files: FileList | File[]) => {
      const valid = Array.from(files)
        .filter((f) => {
          const ext = f.name.toLowerCase().split(".").pop();
          return (
            ACCEPTED_TYPES.includes(f.type) ||
            ext === "heic" ||
            ext === "heif" ||
            ext === "jpg" ||
            ext === "jpeg" ||
            ext === "png" ||
            ext === "webp"
          );
        })
        .slice(0, MAX_PHOTOS);

      if (valid.length > 0) {
        addPhotos(valid);
      }
    },
    [addPhotos]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragOver(false);
  }, []);

  if (processingPhotos) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 3,
          pt: 8,
        }}
      >
        <CircularProgress sx={{ color: "#08C225" }} size={48} />
        <Typography
          sx={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 700,
            fontSize: "1.25rem",
          }}
        >
          Processing your photos...
        </Typography>
        <Box sx={{ width: 300 }}>
          <LinearProgress
            variant="determinate"
            value={processingProgress}
            sx={{
              height: 6,
              borderRadius: 3,
              bgcolor: "#E8E8EA",
              "& .MuiLinearProgress-bar": {
                background:
                  "linear-gradient(135deg, #006E0F 0%, #08C225 100%)",
                borderRadius: 3,
              },
            }}
          />
        </Box>
        <Typography sx={{ color: "#999", fontSize: "0.9rem" }}>
          {processingProgress}% complete
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        pt: 8,
      }}
    >
      {/* Hero */}
      <Box
        component="main"
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          px: 3,
          py: 8,
        }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {/* Background blurs */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            pointerEvents: "none",
            opacity: 0.2,
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: -96,
              left: -96,
              width: 384,
              height: 384,
              bgcolor: "#08C225",
              borderRadius: "50%",
              filter: "blur(120px)",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              right: -96,
              width: 500,
              height: 500,
              bgcolor: "#A4F795",
              borderRadius: "50%",
              filter: "blur(160px)",
            }}
          />
        </Box>

        {/* Drag overlay */}
        {dragOver && (
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              zIndex: 30,
              bgcolor: "rgba(8, 194, 37, 0.08)",
              border: "3px dashed #08C225",
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "#08C225",
              }}
            >
              Drop your photos here
            </Typography>
          </Box>
        )}

        {/* Content */}
        <Box
          sx={{
            position: "relative",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            maxWidth: 900,
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "2.5rem", md: "4rem" },
              fontWeight: 800,
              letterSpacing: "-0.02em",
              mb: 2,
              lineHeight: 1.1,
            }}
          >
            Create your own photobook
          </Typography>
          <Typography
            sx={{
              fontFamily: "'Noto Serif', serif",
              fontStyle: "italic",
              fontSize: "1.15rem",
              color: "#888",
              maxWidth: 560,
              lineHeight: 1.7,
              mb: 6,
            }}
          >
            A completely private, local-first photobook maker. Your photos
            never leave your device.
          </Typography>

          {/* Preview card */}
          <Box
            sx={{
              mb: 6,
              position: "relative",
              "& .card": {
                transition: "transform 0.5s ease",
              },
              "&:hover .card": {
                transform: "rotate(0deg) !important",
              },
            }}
          >
            <Box
              className="card"
              sx={{
                bgcolor: "white",
                p: 4,
                borderRadius: 2,
                boxShadow: "0px 12px 32px rgba(26, 28, 29, 0.06)",
                transform: "rotate(-3deg)",
                position: "relative",
                zIndex: 20,
              }}
            >
              <Box
                sx={{
                  width: { xs: 300, md: 500 },
                  height: { xs: 200, md: 320 },
                  bgcolor: "#E8E8EA",
                  borderRadius: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <AutoStoriesIcon
                  sx={{ fontSize: 64, color: "#ccc" }}
                />
              </Box>
              <Box
                sx={{
                  mt: 2,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  px: 1,
                }}
              >
                <Typography
                  sx={{ fontWeight: 700, fontSize: "1rem", color: "#333" }}
                >
                  Summer Monograph
                </Typography>
                <Typography
                  sx={{
                    fontSize: "0.75rem",
                    color: "#aaa",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                  }}
                >
                  2024 Collection
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                bgcolor: "#E8E8EA",
                borderRadius: 2,
                transform: "rotate(3deg) translate(16px, 16px)",
                zIndex: -1,
                opacity: 0.5,
              }}
            />
          </Box>

          {/* CTA Button */}
          <Button
            variant="contained"
            size="large"
            startIcon={<AddPhotoAlternateIcon />}
            onClick={() => fileInputRef.current?.click()}
            sx={{
              background:
                "linear-gradient(135deg, #006E0F 0%, #08C225 100%)",
              fontSize: "1.15rem",
              fontWeight: 700,
              px: 6,
              py: 2,
              mb: 3,
              boxShadow: "0px 12px 32px rgba(26, 28, 29, 0.06)",
              "&:hover": {
                transform: "scale(1.02)",
                background:
                  "linear-gradient(135deg, #005309 0%, #06A81F 100%)",
              },
              "&:active": {
                transform: "scale(0.95)",
              },
              transition: "all 0.3s ease",
            }}
          >
            Select Images from Device
          </Button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/heic,image/heif,.heic,.heif"
            multiple
            style={{ display: "none" }}
            onChange={(e) => {
              if (e.target.files) handleFiles(e.target.files);
            }}
          />

          {/* Feature badges */}
          <Box
            sx={{
              display: "flex",
              gap: 4,
              color: "#999",
              fontSize: "0.85rem",
            }}
          >
            {["High Resolution Support", "Smart Layout Engine", "Full Privacy"].map(
              (label) => (
                <Box
                  key={label}
                  sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                >
                  <CheckCircleIcon sx={{ fontSize: 16 }} />
                  <Typography sx={{ fontSize: "0.8rem" }}>{label}</Typography>
                </Box>
              )
            )}
          </Box>
        </Box>
      </Box>

      {/* Features section */}
      <Box
        sx={{
          maxWidth: 1100,
          mx: "auto",
          px: 4,
          py: 10,
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" },
          gap: 6,
        }}
      >
        {[
          {
            icon: <AutoStoriesIcon sx={{ fontSize: 28, color: "#006E0F" }} />,
            title: "The Curator's Touch",
            desc: "Our layout engine understands the visual flow of your photos, creating high-end editorial designs automatically.",
          },
          {
            icon: <HistoryEduIcon sx={{ fontSize: 28, color: "#006E0F" }} />,
            title: "Narrative Control",
            desc: "Add captions, quotes, and memories in premium typography that mimics fine-art monographs.",
          },
          {
            icon: <ShieldIcon sx={{ fontSize: 28, color: "#006E0F" }} />,
            title: "Full Privacy",
            desc: "Everything happens in your browser. No uploads, no accounts, just your memories turned into a PDF you can print anywhere.",
          },
        ].map((feat) => (
          <Box key={feat.title} sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            <Box
              sx={{
                width: 48,
                height: 48,
                bgcolor: "rgba(8, 194, 37, 0.08)",
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {feat.icon}
            </Box>
            <Typography sx={{ fontWeight: 700, fontSize: "1.15rem" }}>
              {feat.title}
            </Typography>
            <Typography
              sx={{
                fontFamily: "'Noto Serif', serif",
                color: "#888",
                lineHeight: 1.7,
                fontSize: "0.95rem",
              }}
            >
              {feat.desc}
            </Typography>
          </Box>
        ))}
      </Box>

      <Footer showPrivacyPolicy />
    </Box>
  );
}
