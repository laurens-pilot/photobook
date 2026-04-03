"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { Box } from "@mui/material";
import { PageFlip } from "page-flip";
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
  const bookRef = useRef<HTMLDivElement>(null);
  const pageFlipRef = useRef<PageFlip | null>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 500 });
  const [ready, setReady] = useState(false);

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

  const pageHeight = Math.min(dimensions.height * 0.85, 600);
  const pageWidth = Math.round(pageHeight * PAGE_ASPECT);

  const safeDestroy = useCallback(() => {
    if (pageFlipRef.current) {
      try {
        pageFlipRef.current.destroy();
      } catch {
        // page-flip can throw if UI wasn't fully initialized
      }
      pageFlipRef.current = null;
    }
    setReady(false);
  }, []);

  // Initialize page-flip after DOM has rendered the page elements
  useEffect(() => {
    if (!bookRef.current || pages.length === 0 || pageWidth <= 0) return;

    // Destroy previous instance
    safeDestroy();

    // Use a microtask to ensure React has flushed the page elements to the DOM
    const timerId = setTimeout(() => {
      if (!bookRef.current) return;

      const pageElements = bookRef.current.querySelectorAll(".page-flip-page");
      if (pageElements.length === 0) return;

      try {
        const pf = new PageFlip(bookRef.current, {
          width: pageWidth,
          height: pageHeight,
          size: "fixed",
          minWidth: 200,
          maxWidth: 500,
          minHeight: 280,
          maxHeight: 710,
          showCover: true,
          maxShadowOpacity: 0.3,
          mobileScrollSupport: false,
          flippingTime: 800,
          useMouseEvents: true,
          swipeDistance: 30,
          startPage: currentSpread,
          drawShadow: true,
          autoSize: false,
          startZIndex: 0,
          showPageCorners: true,
        });

        pf.loadFromHTML(Array.from(pageElements) as HTMLElement[]);

        pf.on("flip", (e: any) => {
          const pageIndex = e.data as number;
          const spreadIdx = pageIndex % 2 === 0 ? pageIndex : pageIndex - 1;
          onSpreadChange(spreadIdx);
        });

        pageFlipRef.current = pf;
        setReady(true);
      } catch (e) {
        console.warn("PageFlip initialization failed:", e);
      }
    }, 50);

    return () => {
      clearTimeout(timerId);
      safeDestroy();
    };
  }, [pageWidth, pageHeight, pages.length, safeDestroy]); // eslint-disable-line react-hooks/exhaustive-deps

  // Sync external spread changes to page-flip
  useEffect(() => {
    if (pageFlipRef.current && ready) {
      const currentPage = pageFlipRef.current.getCurrentPageIndex();
      if (currentPage !== currentSpread) {
        pageFlipRef.current.turnToPage(currentSpread);
      }
    }
  }, [currentSpread, ready]);

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
      <Box
        ref={bookRef}
        sx={{
          boxShadow: "0 40px 100px -20px rgba(0,0,0,0.6)",
          borderRadius: 0.5,
        }}
      >
        {pages.map((page, idx) => (
          <PageElement
            key={page.id}
            page={page}
            pageWidth={pageWidth}
            pageHeight={pageHeight}
            pageNumber={idx + 1}
          />
        ))}
      </Box>
    </Box>
  );
}

function PageElement({
  page,
  pageWidth,
  pageHeight,
  pageNumber,
}: {
  page: BookPage;
  pageWidth: number;
  pageHeight: number;
  pageNumber: number;
}) {
  return (
    <div
      className="page-flip-page"
      style={{
        width: pageWidth,
        height: pageHeight,
        background: "white",
        overflow: "hidden",
      }}
    >
      <Stage width={pageWidth} height={pageHeight} listening={false}>
        <Layer>
          <PageCanvas
            page={page}
            pageWidth={pageWidth}
            pageHeight={pageHeight}
          />
        </Layer>
      </Stage>
    </div>
  );
}
