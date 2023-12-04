"use client";

import { Box } from "@mui/material";
const Main = ({ children }) => {
  return (
    <>
      <Box
        sx={{
          marginTop: "64px",
          width: "100%",
          backgroundColor: "body.background.default",
          color: "text.color.first",
          padding: "10px",
        }}
      >
        {children}
      </Box>
    </>
  );
};
export default Main;
