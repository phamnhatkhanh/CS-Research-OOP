"use client";

import { Box, Typography } from "@mui/material";
import { useSearchParams } from "next/navigation";
import SearchResult from "./SearchResult";
const Content = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
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
          Kết quả tìm kiếm cho "{search}"
        </Typography>
        <SearchResult search={search} />
      </Box>
    </>
  );
};
export default Content;
