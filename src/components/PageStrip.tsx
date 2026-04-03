"use client";

import React, { useCallback, useRef } from "react";
import { Box, Typography } from "@mui/material";
import { Stage, Layer, Rect } from "react-konva";
import { useBook } from "@/context/BookContext";
import PageCanvas from "./PageCanvas";

const THUMB_PAGE_W = 60;
const THUMB_PAGE_H = Math.round(THUMB_PAGE_W / (148 / 210)); // A5 aspect

export default function PageStrip() {
  const { book, currentSpreadIndex, setCurrentSpreadIndex } = useBook();
  const pages = book.pages;
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  // Group pages into spreads
  const spreads: [number, number][] = [];
  for (let i = 0; i < pages.length; i += 2) {
    spreads.push([i, Math.min(i + 1, pages.length - 1)]);
  }

  const handleDragStart = (idx: number) => {
    dragItem.current = idx;
  };

  const handleDragEnter = (idx: number) => {
    dragOverItem.current = idx;
  };

  const { reorderPages } = useBook();

  const handleDragEnd = () => {
    if (
      dragItem.current !== null &&
      dragOverItem.current !== null &&
      dragItem.current !== dragOverItem.current
    ) {
      reorderPages(dragItem.current, dragOverItem.current);
    }
    dragItem.current = null;
    dragOverItem.current = null;
  };

  return (
    <Box
      sx={{
        width: 192,
        bgcolor: "#F3F3F5",
        display: "flex",
        flexDirection: "column",
        py: 3,
        px: 2,
        height: "100%",
        overflowY: "auto",
        borderLeft: "1px solid rgba(0,0,0,0.04)",
      }}
    >
      <Typography
        sx={{
          fontSize: "0.6rem",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          color: "#08C225",
          mb: 0.5,
          fontWeight: 500,
        }}
      >
        Preview
      </Typography>
      <Typography
        sx={{
          fontSize: "0.85rem",
          fontWeight: 900,
          color: "#333",
          mb: 2,
        }}
      >
        Pages
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
        {spreads.map(([leftIdx, rightIdx], spreadIdx) => {
          const isActive = currentSpreadIndex === leftIdx;
          const leftPage = pages[leftIdx];
          const rightPage = leftIdx !== rightIdx ? pages[rightIdx] : null;

          return (
            <Box
              key={spreadIdx}
              onClick={() => setCurrentSpreadIndex(leftIdx)}
              draggable
              onDragStart={() => handleDragStart(leftIdx)}
              onDragEnter={() => handleDragEnter(leftIdx)}
              onDragEnd={handleDragEnd}
              sx={{
                cursor: "pointer",
                border: isActive
                  ? "2px solid #08C225"
                  : "2px solid transparent",
                borderRadius: 1.5,
                p: 1,
                bgcolor: isActive ? "rgba(255,255,255,0.5)" : "transparent",
                opacity: isActive ? 1 : 0.6,
                "&:hover": { opacity: 1 },
                transition: "all 0.2s",
              }}
            >
              <Box sx={{ display: "flex", gap: "2px" }}>
                {/* Left page thumbnail */}
                <Box
                  sx={{
                    flex: 1,
                    aspectRatio: `${148}/${210}`,
                    bgcolor: "white",
                    border: "1px solid #ddd",
                    borderRadius: 0.5,
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <Stage
                    width={THUMB_PAGE_W}
                    height={THUMB_PAGE_H}
                    listening={false}
                    style={{ pointerEvents: "none" }}
                  >
                    <Layer>
                      <PageCanvas
                        page={leftPage}
                        pageWidth={THUMB_PAGE_W}
                        pageHeight={THUMB_PAGE_H}
                      />
                    </Layer>
                  </Stage>
                </Box>
                {/* Right page thumbnail */}
                <Box
                  sx={{
                    flex: 1,
                    aspectRatio: `${148}/${210}`,
                    bgcolor: rightPage ? "white" : "#f5f5f5",
                    border: "1px solid #ddd",
                    borderRadius: 0.5,
                    overflow: "hidden",
                  }}
                >
                  {rightPage && (
                    <Stage
                      width={THUMB_PAGE_W}
                      height={THUMB_PAGE_H}
                      listening={false}
                      style={{ pointerEvents: "none" }}
                    >
                      <Layer>
                        <PageCanvas
                          page={rightPage}
                          pageWidth={THUMB_PAGE_W}
                          pageHeight={THUMB_PAGE_H}
                        />
                      </Layer>
                    </Stage>
                  )}
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  px: 0.5,
                  mt: 0.5,
                }}
              >
                <Typography
                  sx={{
                    fontSize: "0.5rem",
                    fontWeight: 700,
                    color: isActive ? "#08C225" : "#999",
                  }}
                >
                  {leftIdx + 1}
                </Typography>
                {rightPage && (
                  <Typography
                    sx={{
                      fontSize: "0.5rem",
                      fontWeight: 700,
                      color: isActive ? "#08C225" : "#999",
                    }}
                  >
                    {rightIdx + 1}
                  </Typography>
                )}
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
