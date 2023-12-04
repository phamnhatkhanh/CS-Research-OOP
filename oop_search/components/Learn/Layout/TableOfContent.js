"use client";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
const TableOfContent = ({ dataPost }) => {
  const [listContents, setListContents] = useState([]);
  const [isContentPos, setIsContentPos] = useState("");
  useEffect(() => {
    const data = [];
    const getH1elements = document.querySelectorAll(".content-html h2");
    if (getH1elements.length > 0) {
      for (let i = 0; i < getH1elements.length; i++) {
        data.push(getH1elements[i]);
      }
    }
    setListContents(data);
  }, [dataPost]);
  useEffect(() => {
    const eventScroll = () => {
      const c = document.documentElement.scrollTop || document.body.scrollTop;
      if (listContents.length > 0) {
        {
          listContents.map((item) => {
            if (c >= item.offsetTop - item.offsetHeight - 18.675) {
              setIsContentPos(item.innerText);
            }
          });
        }
      }
    };
    document.addEventListener("scroll", eventScroll);
    return () => {
      document.removeEventListener("scroll", eventScroll);
    };
  }, [listContents]);

  const handleClickContent = (item) => {
    window.scrollTo(0, item.offsetTop - item.offsetHeight);
    // item.scrollIntoView({
    //   behavior: "smooth",
    //   block: "start",
    // });
  };
  const TitleContent = styled(Typography)({
    fontFamily: "Bebas Neue",
    position: "relative",
    fontSize: "3rem",
    fontWeight: "bold",
  });

  return (
    <>
      <Box
        sx={{
          display: { xs: "none", lg: "flex" },
          borderLeft: "2px solid",
          borderLeftColor: "navigationItem.color.bottom",
          flexDirection: "column",
          backgroundColor: "body.background.default",
          justifyContent: "center",
          color: "text.primary",
          gap: "10px",
          paddingTop: "0px",
          position: "-webkit-sticky",
          position: "sticky",
          top: 64,
          width: "250px",

          maxWidth: "250px",
        }}
      >
        <Typography
          sx={{
            textTransform: "uppercase",
            fontSize: "1.5rem",
            fontWeight: "bold",
            padding: "8px 10px",

            color: "navigationItem.color.phanLoai",
          }}
        >
          On this page
        </Typography>
        <Box
          className="tableofcontents"
          sx={{
            display: "flex",
            alignItems: "flex-start",
            flexDirection: "column",

            justifyContent: "center",
            color: "text.primary",

            width: "100%",

            maxHeight: "100vh",
            overflowY: "auto",
          }}
        >
          {listContents.length > 0 &&
            listContents.map((item, i) => (
              <Box
                onClick={() => handleClickContent(item)}
                key={i}
                sx={{
                  width: "100%",
                  padding: "8px 10px",
                  paddingLeft: "20px",
                  cursor: "pointer",
                  backgroundColor:
                    item.innerText === isContentPos
                      ? "navigationItem.background.active"
                      : "",
                  borderTopLeftRadius: "20px",
                  borderBottomLeftRadius: "20px",
                  display: "flex",
                  alignItems: "center",
                  "&:hover": {
                    color: "#087ea4",
                  },
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 600,
                    color: item.innerText === isContentPos ? "#087ea4" : "",
                  }}
                >
                  {item.innerText}
                </Typography>
              </Box>
            ))}
        </Box>
      </Box>
    </>
  );
};
export default TableOfContent;
