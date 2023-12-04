"use client";
// import Edit from "@/components/Edit/Edit";
import { setNavigationContent } from "@/redux/actions/_navigationContent";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Box, Breadcrumbs, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import TableOfContent from "../Layout/TableOfContent";
import TableOfContentMobile from "../Layout/TableOfContentMobile";
import BaiHocLienQuan from "./BaiHocLienQuan";
const Content = ({ data }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (data && data.data) {
      dispatch(
        setNavigationContent({
          phanLoai: data.data.phanMuc.chuongHoc.phanLoai.slug,
          chuongHoc: data.data.phanMuc.chuongHoc.slug,
          phanMuc: data.data.phanMuc.slug,
          baiHoc: data.data.slug,
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
        <>
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
                      fontSize: "2.5rem",
                      fontWeight: "bold",
                      color: "#087ea4",
                    }}
                  />
                }
                aria-label="breadcrumb"
              >
                <Link
                  href={`/learn/phan-loai/${data.data.phanMuc.chuongHoc.phanLoai.slug}`}
                >
                  <BreadcrumbItem>
                    {data.data.phanMuc.chuongHoc.phanLoai.tenPhanLoai}
                  </BreadcrumbItem>
                </Link>
                <Link
                  href={`/learn/chuong-hoc/${data.data.phanMuc.chuongHoc.slug}`}
                >
                  <BreadcrumbItem>
                    {data.data.phanMuc.chuongHoc.tenChuongHoc}
                  </BreadcrumbItem>
                </Link>
                <Link href={`/learn/phan-muc/${data.data.phanMuc.slug}`}>
                  <BreadcrumbItem>
                    {data.data.phanMuc.tenPhanMuc}
                  </BreadcrumbItem>
                </Link>
              </Breadcrumbs>
              <Typography
                className="learn__title"
                component={"h1"}
                sx={{
                  fontWeight: "700",
                  fontSize: "3rem",
                  margin: "20px 0",
                }}
              >
                {data.data.tenBaiHoc}
              </Typography>

              <BaiHocLienQuan data={data.data}></BaiHocLienQuan>

              <TableOfContentMobile dataPost={data.data} />

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
              {/* <Edit data={data.data} /> */}
            </Box>
            <TableOfContent dataPost={data.data} />
          </Box>
        </>
      )}
    </>
  );
};
export default Content;
