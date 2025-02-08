import React, { useState } from "react";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { Box, Button } from "@mui/material";

export default function ToggleablePanel({ title, children }) {
  const [isClosed, setIsClosed] = useState(true);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "15em",
        backgroundColor: "white",
        boxShadow: "1px 1px 1px 1px rgb(227, 227, 227)",
        borderRadius: "5px",
        border: "solid 1px rgb(227, 227, 227)",
      }}
    >
      <Button
        variant="text"
        onClick={() => setIsClosed(!isClosed)}
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyItems: "space-between",
          color: "black",
          borderRadius: isClosed ? "5px" : "5px 5px 0px 0px",
          borderBottom: isClosed ? "none" : "solid 1.5px rgb(227, 227, 227)",
        }}
        endIcon={
          <ChevronRightRoundedIcon
            sx={{ transform: isClosed ? "rotate(0)" : "rotate(90deg)" }}
          />
        }
      >
        {title}
      </Button>
      {!isClosed && (
        <Box sx={{ display: "flex", flexDirection: "column" }}>{children}</Box>
      )}
    </Box>
  );
}
