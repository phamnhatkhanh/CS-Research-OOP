"use client";
import { Box } from "@mui/material";
const MainLayout = ({ children }) => {
  return (
    <>
      <Box
        className="layout-learn"
        sx={{
          backgroundColor: "header.background.default",
        }}
      >
        {children}
      </Box>
    </>
  );
};
export default MainLayout;
