"use client";
import { Box } from "@mui/material";
import PhanLoai from "../Navigation/PhanLoai";
const Navigation = ({ staticData }) => {
  return (
    <>
      {staticData && (
        <Box
          sx={{
            marginTop: "64px",
            width: "320px",
            backgroundColor: "body.background.default",
            height: "calc(100vh - 64px)",
            color: "text.color.first",
            display: { xs: "none", md: "block" },
            top: "64px",
            position: "sticky",
            borderRight: "2px solid",
            borderRightColor: "navigationItem.color.bottom",
          }}
        >
          <Box
            sx={{
              maxHeight: "calc(100vh - 64px)",
              overflowY: "auto",
            }}
          >
            <Box
              sx={{
                paddingRight: "1.25rem",
                width: "100%",
                height: "100%",
              }}
            >
              {staticData.data &&
                staticData.data?.map((e, i) => (
                  <PhanLoai key={i} phanLoai={e} />
                ))}
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};
export default Navigation;
