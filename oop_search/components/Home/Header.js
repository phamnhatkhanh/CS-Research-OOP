"use client";
import { getToggleDarkMode } from "@/redux/actions/_darkMode";
import ClearIcon from "@mui/icons-material/Clear";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import ReorderIcon from "@mui/icons-material/Reorder";
import { Box, IconButton, Typography } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavigationMobile from "./NavigationMobile";
const Header = ({}) => {
  const dispatch = useDispatch();
  const [isOpenNavigation, setIsOpenNavigation] = useState(false);
  const getStatusNavigation = useSelector((state) => state.navigation.on);
  const getThemeMode = useSelector((state) => state.darkMode.on);
  const handleClickNavigation = () => {
    setIsOpenNavigation(!isOpenNavigation);
  };
  const handleChangeMode = () => {
    dispatch(getToggleDarkMode(!getThemeMode));
  };

  return (
    <>
      {isOpenNavigation && (
        <NavigationMobile handleClickNavigation={handleClickNavigation} />
      )}
      <Box
        sx={{
          position: "fixed",
          height: "64px",
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: "header.background.default",
          color: "text.color.first",
          padding: "10px",
          zIndex: 99,
          boxShadow: "0 3px 6px #0000001a",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: "10px",
              flex: 1,
              alignItems: "center",
            }}
          >
            <IconButton
              onClick={handleClickNavigation}
              sx={{ display: { xs: "flex", md: "none" } }}
            >
              {!getStatusNavigation && <ReorderIcon />}
              {getStatusNavigation && <ClearIcon />}
            </IconButton>
            <Link href="/">
              <Box>
                <img
                  src="/logo_robot.png"
                  width={60}
                  height={60}
                />
              </Box>
            </Link>
            <Link href="/">
              <Box
                sx={{
                  fontWeight: "600",
                }}
              >
                TraCuuOOP
              </Box>
            </Link>
            <Box
              className="btn is-center"
              sx={{
                display: { xs: "none", md: "block" },
                "&:hover": {
                  backgroundColor: "navigationItem.background.hover",
                },
              }}
            >
              <Link href="/learn">
                <Typography sx={{}}>Tra cứu</Typography>
              </Link>
            </Box>
            <Box
              className="btn is-center"
              sx={{
                display: { xs: "none", md: "block" },
                "&:hover": {
                  backgroundColor: "navigationItem.background.hover",
                },
              }}
            >
              <Link href="/code-editor">
                <Typography>Code Editor</Typography>
              </Link>
            </Box>
          </Box>
          <Box
            sx={{
              gap: "10px",
              alignItems: "center",
              display: { xs: "none", md: "flex" },
            }}
          >
            {/* <Box
              className="btn is-center"
              sx={{
                "&:hover": {
                  backgroundColor: "navigationItem.background.hover",
                },
              }}
            >
              <Link href="/about-us">
                <Typography>Về chúng tui</Typography>
              </Link>
            </Box> */}
            <Box
              className="btn is-center"
              sx={{
                "&:hover": {
                  backgroundColor: "navigationItem.background.hover",
                },
              }}
              onClick={handleChangeMode}
            >
              {!getThemeMode && <DarkModeIcon />}
              {getThemeMode && <LightModeIcon />}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default Header;
