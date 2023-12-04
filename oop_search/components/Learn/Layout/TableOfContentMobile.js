"use client";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
const TableOfContentMobile = ({ dataPost }) => {
  const [listContents, setListContents] = useState([]);
  const [isContentPos, setIsContentPos] = useState("");
  const [isExpand, setIsExpand] = useState(false);
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
    //   behavior: "auto",
    //   block: "end",
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
          display: { xs: "flex", lg: "none" },
          boxShadow: (theme) =>
            `1px 2px 6px 0px ${theme.palette.backgroundCode.background.boxShadow}`,
          flexDirection: "column",
          backgroundColor: "card.background.default",
          justifyContent: "center",
          color: "text.primary",
          gap: "10px",
          paddingTop: "0px",
          position: "-webkit-sticky",
          position: "sticky",
          top: 64,
          width: "100%",
          borderRadius: "10px",
          marginTop: "20px",
          padding: "20px",
        }}
      >
        <Typography
          sx={{
            textTransform: "uppercase",
            fontSize: "1.5rem",
            fontWeight: "bold",
            padding: "8px 10px",

            color: "navigationItem.color.phanLoai",
            borderBottom: "2px solid",
            borderBottomColor: "navigationItem.color.bottom",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          On this page
          {isExpand && (
            <KeyboardArrowDownIcon onClick={() => setIsExpand(!isExpand)} />
          )}
          {!isExpand && (
            <KeyboardArrowRightIcon onClick={() => setIsExpand(!isExpand)} />
          )}
        </Typography>
        <Box
          className="tableofcontents"
          sx={{
            display: isExpand ? "flex" : "none",
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
export default TableOfContentMobile;
