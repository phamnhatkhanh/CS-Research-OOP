"use client";
import { Box } from "@mui/material";
import Link from "next/link";
import ItemLesson from "../ItemLesson";
const DanhSachCacBaiHoc = ({ data }) => {
  return (
    <>
      {data && data.length > 0 && (
        <Box
          sx={{
            gridTemplateColumns: {
              xs: "repeat(1, minmax(0, 1fr))",
              md: "repeat(2, minmax(0, 1fr))",
            },

            display: "grid",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {data.map((item, i) => (
            <Link key={i} href={`/learn/bai-hoc/${item.slug}`}>
              <ItemLesson
                tieuDe={`Bài ${i + 1}: ${item.tenBaiHoc}`}
                noiDung={item.noiDung}
              ></ItemLesson>
            </Link>
          ))}
        </Box>
      )}
    </>
  );
};
export default DanhSachCacBaiHoc;
