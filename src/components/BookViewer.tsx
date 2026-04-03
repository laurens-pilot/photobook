"use client";

import React, { useRef, useEffect, useState, useMemo, useCallback } from "react";
import { Box } from "@mui/material";
import { Stage, Layer } from "react-konva";
import type { BookPage } from "@/lib/types";
import { useBook } from "@/context/BookContext";
import PageCanvas from "./PageCanvas";

interface BookViewerProps {
  pages: BookPage[];
  currentSpread: number;
  onSpreadChange: (idx: number) => void;
}

const PAGE_ASPECT = 148 / 210;

export default function BookViewer({
  pages,
  currentSpread,
  onSpreadChange,
}: BookViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 500 });

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Calculate page dimensions to fill container
  const pageHeight = Math.min(dimensions.height * 0.9, 600);
  const pageWidth = Math.round(pageHeight * PAGE_ASPECT);
  const spreadWidth = pageWidth * 2;

  const leftPage = pages[currentSpread];
  const rightPage = pages[currentSpread + 1];

  return (
    <Box
      ref={containerRef}
      sx={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        minHeight: 400,
      }}
    >
      {/* Book spread */}
      <Box
        sx={{
          display: "flex",
          boxShadow: "0 40px 100px -20px rgba(0,0,0,0.6)",
          borderRadius: 0.5,
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Left page */}
        {leftPage && (
          <Box sx={{ borderRight: "1px solid rgba(255,255,255,0.1)" }}>
            <Stage width={pageWidth} height={pageHeight} listening={false}>
              <Layer>
                <PageCanvas
                  page={leftPage}
                  pageWidth={pageWidth}
                  pageHeight={pageHeight}
                />
              </Layer>
            </Stage>
          </Box>
        )}
        {/* Right page */}
        {rightPage && (
          <Box>
            <Stage width={pageWidth} height={pageHeight} listening={false}>
              <Layer>
                <PageCanvas
                  page={rightPage}
                  pageWidth={pageWidth}
                  pageHeight={pageHeight}
                />
              </Layer>
            </Stage>
          </Box>
        )}
        {/* Spine shadow overlay */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            left: "50%",
            width: 16,
            transform: "translateX(-50%)",
            background:
              "linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0) 100%)",
            pointerEvents: "none",
          }}
        />
      </Box>
    </Box>
  );
}
