"use client";

import { setNavigationContent } from "@/redux/actions/_navigationContent";
import { Box, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import DanhSachCacChuong from "./DanhSachCacChuong";
const Content = ({ data }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (data && data.data) {
      dispatch(
        setNavigationContent({
          phanLoai: data.data.slug,
          chuongHoc: null,
          phanMuc: null,
          baiHoc: null,
        })
      );
    }
  }, [data]);
  const params = useParams();
  return (
    <>
      {data && data.data && (
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            gap: "20px",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              width: "100%",
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
              Phân loại: {data.data.tenPhanLoai}
            </Typography>
            <Typography
              component="div"
              sx={{
                width: "100%",
                fontSize: "2rem",
              }}
            >
              <div
                className="content-html"
                dangerouslySetInnerHTML={{ __html: data.data.noiDung }}
              />
            </Typography>
            <DanhSachCacChuong data={data.chuongHoc}></DanhSachCacChuong>
          </Box>
          <Box
            sx={{
              width: "250px",
              display: { xs: "none", lg: "flex" },

              maxWidth: "250px",
            }}
          ></Box>
        </Box>
      )}
    </>
  );
};
export default Content;
