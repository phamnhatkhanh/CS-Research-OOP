"use client";

import { setNavigationContent } from "@/redux/actions/_navigationContent";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Box, Breadcrumbs, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import DanhSachCacBaiHoc from "./DanhSachCacBaiHoc";

const Content = ({ data }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (data && data.data) {
      dispatch(
        setNavigationContent({
          phanLoai: data.data.chuongHoc.phanLoai.slug,
          chuongHoc: data.data.chuongHoc.slug,
          phanMuc: data.data.slug,
          baiHoc: null,
        })
      );
    }
  }, [data]);

  const BreadcrumbItem = styled(Box)(({ theme }) => ({
    textTransform: "uppercase",
    color: "#087ea4",
    fontWeight: 600,
    fontSize: "1.4rem",
  }));
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
            <Breadcrumbs
              separator={
                <KeyboardArrowRightIcon
                  sx={{
                    fontSize: "1.2rem",
                  }}
                />
              }
              aria-label="breadcrumb"
            >
              <Link
                href={`/learn/phan-loai/${data.data.chuongHoc.phanLoai.slug}`}
              >
                <BreadcrumbItem>
                  {data.data.chuongHoc.phanLoai.tenPhanLoai}
                </BreadcrumbItem>
              </Link>
              <Link href={`/learn/chuong-hoc/${data.data.chuongHoc.slug}`}>
                <BreadcrumbItem>
                  {data.data.chuongHoc.tenChuongHoc}
                </BreadcrumbItem>
              </Link>
            </Breadcrumbs>
            <Typography
              className="learn__title"
              sx={{
                fontWeight: "700",
                fontSize: "3rem",
                margin: "20px 0",
              }}
            >
              Phân mục: {data.data.tenPhanMuc}
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
            <DanhSachCacBaiHoc data={data.baiHoc}></DanhSachCacBaiHoc>
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
