"use client";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
const NavigationLoading = () => {
  return (
    <>
      <Box sx={{ width: 320 }}>
        <Skeleton />
        {Array.from({ length: 10 }).map((item, i) => (
          <Skeleton key={i} animation="wave" height={60} />
        ))}
      </Box>
    </>
  );
};
export default NavigationLoading;
