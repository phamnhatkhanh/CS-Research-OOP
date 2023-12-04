"use client";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
const BaiHocLienQuan = ({ data }) => {
  return (
    <>
      {data && data.baiHocLienQuan && data.baiHocLienQuan.length > 0 && (
        <Box
          sx={{
            backgroundColor: "card.background.default",
            padding: "20px",
            borderRadius: "15px",
            border: "2px solid",
            borderColor: "card.background.border",
            boxShadow: (theme) =>
              `1px 2px 6px 0px ${theme.palette.backgroundCode.background.boxShadow}`,
          }}
        >
          <Typography
            sx={{
              fontSize: "2.5rem",
              fontWeight: "bold",
            }}
          >
            Bài học liên quan
          </Typography>
          <Box
            component={"ul"}
            sx={{
              listStyleType: "disc",
              paddingLeft: "30px",
            }}
          >
            {data.baiHocLienQuan.map((item, i) => (
              <Link key={i} href={`/learn/bai-hoc/${item.slug}`}>
                <Typography component={"li"}>{item.tenBaiHoc}</Typography>
              </Link>
            ))}
          </Box>
        </Box>
      )}
    </>
  );
};
export default BaiHocLienQuan;
