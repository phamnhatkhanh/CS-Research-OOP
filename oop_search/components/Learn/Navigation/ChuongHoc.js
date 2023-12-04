"use client";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Box, Typography } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PhanMuc from "./PhanMuc";
const ChuongHoc = ({ chuong, i }) => {
  const getNavigationContent = useSelector((state) => state.navigationContent);

  const [isExpand, setIsExpand] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    if (getNavigationContent && getNavigationContent.chuongHoc) {
      if (getNavigationContent.chuongHoc === chuong.slug) {
        setIsExpand(true);
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    }
  }, [getNavigationContent]);

  useEffect(() => {
    if (pathname.startsWith("/learn/chuong-hoc/")) {
      const getSlugChuongHoc = pathname.split("/")[3];
      setIsActive(getSlugChuongHoc === chuong.slug);
    } else {
      setIsActive(false);
    }
  }, [pathname]);
  const handleClick = (e, chuonghoc) => {
    e.preventDefault();
    router.push(`/learn/chuong-hoc/${chuonghoc.slug}`);
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            borderTopRightRadius: "20px",
            borderBottomRightRadius: "20px",
            padding: "8px 10px",
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "navigationItem.background.hover",
              borderTopRightRadius: "20px",
              borderBottomRightRadius: "20px",
            },
          }}
        >
          <Typography
            sx={{
              fontWeight: "600",
              color: isActive ? "#087ea4" : "",
            }}
            onClick={(e) => handleClick(e, chuong)}
          >
            Chương {i + 1}: {chuong.tenChuongHoc}
          </Typography>

          <Box onClick={() => setIsExpand(!isExpand)}>
            {!isExpand && (
              <KeyboardArrowRightIcon
                sx={{
                  width: "20px",
                  height: "20px",
                }}
              />
            )}
            {isExpand && (
              <KeyboardArrowDownIcon
                sx={{
                  width: "20px",
                  height: "20px",
                }}
              />
            )}
          </Box>
        </Box>
        <Box
          sx={{
            display: isExpand ? "block" : "none",
          }}
        >
          {chuong.phanMuc?.map((phanmuc, i) => (
            <PhanMuc key={i} phanmuc={phanmuc} i={i} />
          ))}
        </Box>
      </Box>
    </>
  );
};
export default ChuongHoc;
