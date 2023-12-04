"use client";
import { Box, Typography } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const BaiHoc = ({ baihoc, i }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    if (pathname.startsWith("/learn/bai-hoc/")) {
      const getSlugBaiHoc = pathname.split("/")[3];
      setIsActive(getSlugBaiHoc === baihoc.slug);
    } else {
      setIsActive(false);
    }
  }, [pathname]);
  const handleClick = (e, baihoc) => {
    e.preventDefault();
    router.push(`/learn/bai-hoc/${baihoc.slug}`);
  };
  return (
    <>
      <Box
        sx={{
          padding: "8px 10px",
          paddingLeft: "20px",
          cursor: "pointer",
          backgroundColor: isActive ? "navigationItem.background.active" : "",
          borderTopRightRadius: "20px",
          borderBottomRightRadius: "20px",
          "&:hover": {
            backgroundColor: "navigationItem.background.hover",
            borderTopRightRadius: "20px",
            borderBottomRightRadius: "20px",
          },
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontWeight: 500,
            color: isActive ? "#087ea4" : "",
          }}
          onClick={(e) => handleClick(e, baihoc)}
        >
          Bài {i + 1}: {baihoc.tenBaiHoc}
        </Typography>
      </Box>
    </>
  );
};
export default BaiHoc;
