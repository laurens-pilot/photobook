"use client";

import React, { useState } from "react";
import {
  Popover,
  TextField,
  Box,
  Typography,
} from "@mui/material";

interface CaptionEditorProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  topCaption: string;
  bottomCaption: string;
  onChangeTop: (val: string) => void;
  onChangeBottom: (val: string) => void;
}

export default function CaptionEditor({
  anchorEl,
  open,
  onClose,
  topCaption,
  bottomCaption,
  onChangeTop,
  onChangeBottom,
}: CaptionEditorProps) {
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Box sx={{ p: 2, width: 300 }}>
        <Typography
          sx={{ fontSize: "0.85rem", fontWeight: 700, mb: 1 }}
        >
          Page Captions
        </Typography>
        <TextField
          label="Top Caption"
          size="small"
          fullWidth
          value={topCaption}
          onChange={(e) => onChangeTop(e.target.value)}
          sx={{ mb: 1.5 }}
          inputProps={{
            style: { fontFamily: "'Noto Serif', serif", fontStyle: "italic" },
          }}
        />
        <TextField
          label="Bottom Caption"
          size="small"
          fullWidth
          value={bottomCaption}
          onChange={(e) => onChangeBottom(e.target.value)}
          inputProps={{
            style: { fontFamily: "'Noto Serif', serif", fontStyle: "italic" },
          }}
        />
      </Box>
    </Popover>
  );
}
