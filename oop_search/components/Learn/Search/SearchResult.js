"use client";

import { Box, CircularProgress, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import SearchResultItem from "./SearchResultItem";
const SearchResult = ({ search }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getSearchResult = async () => {
    try {
      setIsLoading(true);
      const data = await axios.get(
        `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/search?search=${search}`
      );
      setIsLoading(false);
      setData(data.data.data);
    } catch (err) {
      setIsLoading(false);
      toast.error(err);
    }
  };
  useEffect(() => {
    if (search !== "") {
      getSearchResult();
    }
  }, [search]);
  return (
    <>
      {isLoading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress color="inherit" size={60} />
        </Box>
      )}
      {!isLoading && (
        <Box sx={{}}>
          <Box
            sx={{
              paddingRight: "1.25rem",
              width: "100%",
              height: "100%",
            }}
          >
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
                <Typography
                  sx={{
                    textTransform: "uppercase",
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    color: "navigationItem.color.phanLoai",
                  }}
                >
                  Phân loại
                </Typography>
              </Box>
              {data &&
                data.phanLoai &&
                data.phanLoai.map((item, i) => (
                  <SearchResultItem
                    slugKetQua={`/learn/phan-loai/${item.slug}`}
                    tenKetQua={item.tenPhanLoai}
                    key={i}
                  />
                ))}
            </Box>
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
                <Typography
                  sx={{
                    textTransform: "uppercase",
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    color: "navigationItem.color.phanLoai",
                  }}
                >
                  Chương học
                </Typography>
              </Box>
              {data &&
                data.chuongHoc &&
                data.chuongHoc.map((item, i) => (
                  <SearchResultItem
                    slugKetQua={`/learn/chuong-hoc/${item.slug}`}
                    tenKetQua={item.tenChuongHoc}
                    key={i}
                  />
                ))}
            </Box>
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
                <Typography
                  sx={{
                    textTransform: "uppercase",
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    color: "navigationItem.color.phanLoai",
                  }}
                >
                  Phân mục
                </Typography>
              </Box>
              {data &&
                data.phanMuc &&
                data.phanMuc.map((item, i) => (
                  <SearchResultItem
                    slugKetQua={`/learn/phan-muc/${item.slug}`}
                    tenKetQua={item.tenPhanMuc}
                    key={i}
                  />
                ))}
            </Box>
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
                <Typography
                  sx={{
                    textTransform: "uppercase",
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    color: "navigationItem.color.phanLoai",
                  }}
                >
                  Bài học
                </Typography>
              </Box>
              {data &&
                data.baiHoc &&
                data.baiHoc.map((item, i) => (
                  <SearchResultItem
                    slugKetQua={`/learn/bai-hoc/${item.slug}`}
                    tenKetQua={item.tenBaiHoc}
                    key={i}
                  />
                ))}
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};
export default SearchResult;
