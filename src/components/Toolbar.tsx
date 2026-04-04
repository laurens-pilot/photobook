"use client";

import React from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import ReplayRoundedIcon from "@mui/icons-material/ReplayRounded";
import { useBook } from "@/context/BookContext";

interface ToolbarProps {
  onAddPhotos: () => void;
  onAddText: () => void;
}

export default function Toolbar({
  onAddPhotos,
  onAddText,
}: ToolbarProps) {
  const {
    addPage,
    currentSpreadIndex,
    undo,
    redo,
    canUndo,
    canRedo,
  } = useBook();

  const handleAddPage = () => {
    addPage(currentSpreadIndex + 1);
  };

  const handleAddText = () => {
    onAddText();
  };

  const buttonSx = {
    width: 44,
    height: 44,
    color: "#888",
    "&:hover": { color: "#08C225", bgcolor: "rgba(255,255,255,0.08)" },
    borderRadius: 2,
    transition: "all 0.2s",
  };

  const disabledButtonSx = {
    ...buttonSx,
    "&.Mui-disabled": { color: "#444" },
  };

  return (
    <Box
      sx={{
        width: 72,
        bgcolor: "#141617",
        display: "flex",
        flexDirection: "column",
        py: 3,
        alignItems: "center",
        gap: 1.5,
        height: "100%",
        borderRight: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <Tooltip title="Add photos" placement="right">
        <IconButton onClick={onAddPhotos} sx={buttonSx}>
          <AddIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="Add page" placement="right">
        <IconButton onClick={handleAddPage} sx={buttonSx}>
          <NoteAddIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="Add text" placement="right">
        <IconButton onClick={handleAddText} sx={buttonSx}>
          <TextFieldsIcon />
        </IconButton>
      </Tooltip>

      <Box sx={{ flex: 1 }} />

      <Tooltip title="Undo" placement="right">
        <span>
          <IconButton onClick={undo} disabled={!canUndo} sx={disabledButtonSx}>
            <ReplayRoundedIcon />
          </IconButton>
        </span>
      </Tooltip>

      <Tooltip title="Redo" placement="right">
        <span>
          <IconButton onClick={redo} disabled={!canRedo} sx={disabledButtonSx}>
            <ReplayRoundedIcon sx={{ transform: "scaleX(-1)" }} />
          </IconButton>
        </span>
      </Tooltip>
    </Box>
  );
}
