"use client";
import { Box } from "@mui/material";
const ItemLesson = ({ tieuDe, noiDung }) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "20px",

          borderRadius: "20px",
          backgroundColor: "card.background.default",
          border: "2px solid",
          borderColor: "card.background.border",
          boxShadow: (theme) =>
            `1px 2px 6px 0px ${theme.palette.backgroundCode.background.boxShadow}`,
          transition: "border 0.25s linear",
          ":hover": {
            borderColor: "#087ea4",
          },
        }}
      >
        <Box
          title={tieuDe}
          sx={{
            fontWeight: 600,
            overflow: "hidden",
            height: "60px",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          📄️ {tieuDe}
        </Box>
        <Box sx={{}}>
          <div
            style={{
              WebkitMaskImage: "linear-gradient(rgb(0, 0, 0) 60%, transparent)",
              height: "100px",
              maxHeight: "100px",
              minHeight: "100px",
            }}
            dangerouslySetInnerHTML={{ __html: noiDung.slice(0, 100) }}
          />
        </Box>
      </Box>
    </>
  );
};
export default ItemLesson;
