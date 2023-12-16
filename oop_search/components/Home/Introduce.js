"use client";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
import SearchInput from "../Layout/SearchInput";
const Introduce = () => {
  return (
    <Box
      sx={{
        paddingTop: "64px",
        width: "100%",

        backgroundColor: "header.background.default",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
          color: "text.color.first",
          padding: "20px",
        }}
      >
        

        <Box
          sx={{
            display: "flex",
            gap: "10px",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <Link href="/learn">
            <Box
              sx={{
                alignItems: "center",
                width: "350px",
                height: "150px",
                padding: "20px",
                borderRadius: "15px",
                border: "2px solid",
                backgroundColor: "card.background.default",
                borderColor: "card.background.border",
                boxShadow: (theme) =>
                  `1px 2px 6px 0px ${theme.palette.backgroundCode.background.boxShadow}`,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                transition: "border 0.25s linear",
                ":hover": {
                  borderColor: "#087ea4",
                },
              }}
            >
              <Box>
                <img
                  src="https://i.imgur.com/Sz12vdR.png"
                  width={100}
                  height={100}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "600",
                    fontSize: "2rem",
                  }}
                >
                  Tra cứu
                </Typography>
                <Typography>Tra cứu kiến thức OOP</Typography>
              </Box>
            </Box>
          </Link>
          <Link href="/code-editor">
            <Box
              sx={{
                alignItems: "center",
                width: "350px",
                height: "150px",
                padding: "20px",
                borderRadius: "15px",
                border: "2px solid",
                backgroundColor: "card.background.default",
                borderColor: "card.background.border",
                boxShadow: (theme) =>
                  `1px 2px 6px 0px ${theme.palette.backgroundCode.background.boxShadow}`,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                transition: "border 0.25s linear",
                ":hover": {
                  borderColor: "#087ea4",
                },
              }}
            >
              <Box>
                <img
                  src="https://i.imgur.com/hrudvQb.png"
                  width={100}
                  height={100}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "600",
                    fontSize: "2rem",
                  }}
                >
                  Code Editor
                </Typography>
                <Typography>Trình biên soạn code</Typography>
              </Box>
            </Box>
          </Link>
        </Box>
        <SearchInput />

        <Box>
          {" "}
          <img src="https://i.imgur.com/TL53fbS.png" width={250} height={250} />
        </Box>
        <Box>
          <Typography
            component={"h1"}
            sx={{
              fontSize: { xs: "3rem", md: "5rem" },
              fontWeight: "bold",
            }}
          >
            Tra cứu kiến thức OOP
          </Typography>
        </Box>
        <Box>
          <Typography
            sx={{
              fontSize: { xs: "2rem", md: "2.5rem" },
              fontWeight: "bold",
            }}
          >
            Trang web dùng để tra cứu các khái niệm, tính chất, dạng bài tập về
            lập trình hướng đối tượng
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
export default Introduce;
