"use client";

import React, { useState, useCallback } from "react";
import {
  Box,
  Button,
  Typography,
  IconButton,
  CircularProgress,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import EditIcon from "@mui/icons-material/Edit";
import DownloadIcon from "@mui/icons-material/Download";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import FolderZipIcon from "@mui/icons-material/FolderZip";
import { useBook } from "@/context/BookContext";
import BookViewer from "./BookViewer";
import Footer from "./Footer";
import {
  exportPdfA5,
  exportPdfA4Spreads,
  exportPngZip,
  downloadBlob,
} from "@/lib/export";

export default function ResultsPage() {
  const { book, setAppView, photoUrls } = useBook();
  const [currentSpread, setCurrentSpread] = useState(0);
  const [exporting, setExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [downloadAnchor, setDownloadAnchor] = useState<null | HTMLElement>(
    null
  );
  const pages = book.pages;
  const totalPages = pages.length;

  const goToSpread = useCallback(
    (idx: number) => {
      const clamped = Math.max(0, Math.min(idx, totalPages - 1));
      const even = clamped % 2 === 0 ? clamped : clamped - 1;
      setCurrentSpread(even);
    },
    [totalPages]
  );

  const handleExport = useCallback(
    async (type: "pdf-a5" | "pdf-a4" | "png-zip") => {
      setDownloadAnchor(null);
      setExporting(true);
      setExportProgress(0);

      try {
        let blob: Blob;
        let filename: string;

        switch (type) {
          case "pdf-a5":
            blob = await exportPdfA5(pages, photoUrls, setExportProgress);
            filename = "photobook-A5.pdf";
            break;
          case "pdf-a4":
            blob = await exportPdfA4Spreads(
              pages,
              photoUrls,
              setExportProgress
            );
            filename = "photobook-A4-spreads.pdf";
            break;
          case "png-zip":
            blob = await exportPngZip(pages, photoUrls, setExportProgress);
            filename = "photobook-pages.zip";
            break;
        }

        downloadBlob(blob, filename);
      } catch (e) {
        console.error("Export failed:", e);
      } finally {
        setExporting(false);
      }
    },
    [pages, photoUrls]
  );

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Dark viewer area */}
      <Box
        sx={{
          flex: 1,
          pt: "64px",
          bgcolor: "#1a1c1d",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle green glow */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 50% 40%, rgba(8,194,37,0.05), transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Navigation arrows + viewer */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            px: 4,
            py: 4,
            position: "relative",
          }}
        >
          {/* Left arrow */}
          <IconButton
            onClick={() => goToSpread(currentSpread - 2)}
            disabled={currentSpread === 0}
            sx={{
              position: "absolute",
              left: 24,
              zIndex: 10,
              width: 48,
              height: 48,
              color: "white",
              bgcolor: "rgba(226, 226, 228, 0.15)",
              backdropFilter: "blur(10px)",
              "&:hover": { bgcolor: "rgba(226, 226, 228, 0.3)" },
              "&.Mui-disabled": { opacity: 0.3 },
            }}
          >
            <ChevronLeftIcon sx={{ fontSize: 32 }} />
          </IconButton>

          {/* Book viewer */}
          <BookViewer
            pages={pages}
            currentSpread={currentSpread}
            onSpreadChange={setCurrentSpread}
          />

          {/* Right arrow */}
          <IconButton
            onClick={() => goToSpread(currentSpread + 2)}
            disabled={currentSpread + 2 >= totalPages}
            sx={{
              position: "absolute",
              right: 24,
              zIndex: 10,
              width: 48,
              height: 48,
              color: "white",
              bgcolor: "rgba(226, 226, 228, 0.15)",
              backdropFilter: "blur(10px)",
              "&:hover": { bgcolor: "rgba(226, 226, 228, 0.3)" },
              "&.Mui-disabled": { opacity: 0.3 },
            }}
          >
            <ChevronRightIcon sx={{ fontSize: 32 }} />
          </IconButton>
        </Box>

        {/* Bottom controls */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3,
            pb: 4,
          }}
        >
          {/* Page indicator */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              bgcolor: "rgba(226, 226, 228, 0.1)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.05)",
              px: 3,
              py: 1,
              borderRadius: 999,
            }}
          >
            <Typography
              sx={{
                color: "rgba(255,255,255,0.4)",
                fontSize: "0.7rem",
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                fontWeight: 500,
              }}
            >
              Page
            </Typography>
            <Typography
              sx={{ color: "#08C225", fontWeight: 700, fontSize: "0.85rem" }}
            >
              {currentSpread + 1}-{Math.min(currentSpread + 2, totalPages)}
            </Typography>
            <Typography sx={{ color: "rgba(255,255,255,0.2)" }}>/</Typography>
            <Typography
              sx={{
                color: "rgba(255,255,255,0.6)",
                fontWeight: 500,
                fontSize: "0.85rem",
              }}
            >
              {totalPages}
            </Typography>
          </Box>

          {/* Action buttons */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Button
              startIcon={<EditIcon />}
              onClick={() => setAppView("edit")}
              sx={{
                color: "rgba(255,255,255,0.7)",
                fontWeight: 500,
                textTransform: "uppercase",
                fontSize: "0.8rem",
                letterSpacing: "0.05em",
                "&:hover": { color: "white" },
              }}
            >
              Edit Photobook
            </Button>

            <Button
              variant="contained"
              startIcon={
                exporting ? (
                  <CircularProgress size={18} sx={{ color: "white" }} />
                ) : (
                  <DownloadIcon />
                )
              }
              disabled={exporting}
              onClick={(e) => setDownloadAnchor(e.currentTarget)}
              sx={{
                background:
                  "linear-gradient(135deg, #006E0F 0%, #08C225 100%)",
                fontWeight: 700,
                fontSize: "0.85rem",
                px: 4,
                py: 1.5,
                boxShadow: "0 8px 20px rgba(8,194,37,0.3)",
                "&:hover": {
                  boxShadow: "0 12px 32px rgba(8,194,37,0.4)",
                },
              }}
            >
              {exporting
                ? `Exporting ${exportProgress}%`
                : "Download"}
            </Button>

            <Menu
              anchorEl={downloadAnchor}
              open={Boolean(downloadAnchor)}
              onClose={() => setDownloadAnchor(null)}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              transformOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              <MenuItem onClick={() => handleExport("pdf-a5")}>
                <ListItemIcon>
                  <PictureAsPdfIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary="PDF — A5 Pages"
                  secondary="One page per PDF page"
                />
              </MenuItem>
              <MenuItem onClick={() => handleExport("pdf-a4")}>
                <ListItemIcon>
                  <PictureAsPdfIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary="PDF — A4 Spreads"
                  secondary="Two pages per PDF page"
                />
              </MenuItem>
              <MenuItem onClick={() => handleExport("png-zip")}>
                <ListItemIcon>
                  <FolderZipIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary="ZIP — A5 PNGs"
                  secondary="High-res PNG per page"
                />
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      </Box>

      <Footer />
    </Box>
  );
}
