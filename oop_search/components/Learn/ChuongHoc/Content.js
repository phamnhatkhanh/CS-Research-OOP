"use client";

import { setNavigationContent } from "@/redux/actions/_navigationContent";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Box, Breadcrumbs, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import DanhSachCacPhanMuc from "./DanhSachCacPhanMuc";
const Content = ({ data }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (data && data.data) {
      dispatch(
        setNavigationContent({
          phanLoai: data.data.phanLoai.slug,
          chuongHoc: data.data.slug,
          phanMuc: null,
          baiHoc: null,
        })
      );
    }
  }, [data]);
  const params = useParams();

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
              <Link href={`/learn/phan-loai/${data.data.phanLoai.slug}`}>
                <BreadcrumbItem>
                  {data.data.phanLoai.tenPhanLoai}
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
              Chương học: {data.data.tenChuongHoc}
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
            <DanhSachCacPhanMuc data={data.phanMuc}></DanhSachCacPhanMuc>
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
