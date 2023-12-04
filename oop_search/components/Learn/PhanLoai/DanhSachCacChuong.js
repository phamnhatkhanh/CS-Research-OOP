"use client";
import { Box } from "@mui/material";
import Link from "next/link";
import ItemLesson from "../ItemLesson";
const DanhSachCacChuong = ({ data }) => {
  console.log(data);
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
            <Link key={i} href={`/learn/chuong-hoc/${item.slug}`}>
              <ItemLesson
                tieuDe={`Chương ${i + 1}: ${item.tenChuongHoc}`}
                noiDung={item.noiDung}
              ></ItemLesson>
            </Link>
          ))}
        </Box>
      )}
    </>
  );
};
export default DanhSachCacChuong;
