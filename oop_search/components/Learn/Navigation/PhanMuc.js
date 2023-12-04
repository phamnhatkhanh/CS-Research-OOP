"use client";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Box, Typography } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BaiHoc from "./BaiHoc";

const PhanMuc = ({ phanmuc, i }) => {
  const [isExpand, setIsExpand] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);
  const getNavigationContent = useSelector((state) => state.navigationContent);

  useEffect(() => {
    if (getNavigationContent && getNavigationContent.phanMuc) {
      if (getNavigationContent.phanMuc === phanmuc.slug) {
        setIsExpand(true);
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    }
  }, [getNavigationContent]);

  useEffect(() => {
    if (pathname.startsWith("/learn/phan-muc/")) {
      const getSlugPhanMuc = pathname.split("/")[3];
      setIsActive(getSlugPhanMuc === phanmuc.slug);
    } else {
      setIsActive(false);
    }
  }, [pathname]);
  const handleClick = (e, phanmuc) => {
    e.preventDefault();
    router.push(`/learn/phan-muc/${phanmuc.slug}`);
  };
  return (
    <>
      <Box
        sx={{
          padding: "8px 10px",
          paddingLeft: "15px",
          cursor: "pointer",
          backgroundColor: "",
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
            fontWeight: 600,
            color: isActive ? "#087ea4" : "",
          }}
          onClick={(e) => handleClick(e, phanmuc)}
        >
          Phân mục {i + 1}: {phanmuc.tenPhanMuc}
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
        {phanmuc.baiHoc?.map((baihoc, i) => (
          <BaiHoc key={i} baihoc={baihoc} i={i} />
        ))}
      </Box>
    </>
  );
};
export default PhanMuc;
