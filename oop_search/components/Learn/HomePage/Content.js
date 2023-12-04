"use client";

import { Box, Typography } from "@mui/material";

const Content = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          className="learn__title"
          sx={{
            fontWeight: "700",
            fontSize: "3rem",
            margin: "20px 0",
          }}
        >
          Trang chủ học tập
        </Typography>
        <Typography className="learn__content">
          Chọn mục muốn tìm hiểu ở thanh menu bên cạnh
        </Typography>
      </Box>
    </>
  );
};
export default Content;
