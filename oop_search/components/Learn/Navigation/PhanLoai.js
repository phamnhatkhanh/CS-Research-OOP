"use client";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ChuongHoc from "./ChuongHoc";
const PhanLoai = ({ phanLoai }) => {
  const getNavigationContent = useSelector((state) => state.navigationContent);
  const [isExpand, setIsExpand] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    if (getNavigationContent && getNavigationContent.phanLoai) {
      setIsActive(getNavigationContent.phanLoai === phanLoai.slug);
    }
  }, [getNavigationContent]);
  useEffect(() => {
    if (pathname.startsWith("/learn/phan-loai/")) {
      const getSlugPhanLoai = pathname.split("/")[3];
      setIsActive(getSlugPhanLoai === phanLoai.slug);
    } else {
      setIsActive(false);
    }
  }, [pathname]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          paddingBottom: "10px",
          borderBottom: "2px solid",
          borderBottomColor: "navigationItem.color.bottom",
        }}
      >
        <Box
          sx={{
            padding: "8px 10px",
          }}
        >
          <Link href={`/learn/phan-loai/${phanLoai.slug}`}>
            <Typography
              sx={{
                textTransform: "uppercase",
                fontSize: "1.5rem",
                fontWeight: "bold",
                color: isActive ? "#087ea4" : "navigationItem.color.phanLoai",
              }}
            >
              {phanLoai.tenPhanLoai}
            </Typography>
          </Link>
        </Box>
        {phanLoai.chuongHoc?.map((chuong, i) => (
          <ChuongHoc key={i} chuong={chuong} i={i} />
        ))}
      </Box>
    </>
  );
};
export default PhanLoai;
