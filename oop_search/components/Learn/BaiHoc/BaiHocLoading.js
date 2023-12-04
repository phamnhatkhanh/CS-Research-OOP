"use client";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
const BaiHocLoading = () => {
  return (
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
          <Skeleton />
          <Skeleton animation="wave" width="40%" />
          <Skeleton animation="wave" height={60} width="30%" />
          <Skeleton variant="rectangular" width="100%" height={100} />
        </Box>
        <Box
          sx={{
            display: { xs: "none", lg: "flex" },

            flexDirection: "column",
            bgcolor: "background.default",
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
          <Skeleton animation="wave" width="40%" />
          <Skeleton animation="wave" width="100%" />
          <Skeleton animation="wave" width="100%" />
        </Box>
      </Box>
    </>
  );
};
export default BaiHocLoading;
