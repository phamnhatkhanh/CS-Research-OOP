"use client";
import { getToggleDarkMode } from "@/redux/actions/_darkMode";
import { getToggleNavigation } from "@/redux/actions/_navigation";
import ClearIcon from "@mui/icons-material/Clear";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import ReorderIcon from "@mui/icons-material/Reorder";
import { Box, IconButton, Typography } from "@mui/material";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import SearchInput from "./SearchInput";
const Header = ({}) => {
  const dispatch = useDispatch();
  const getStatusNavigation = useSelector((state) => state.navigation.on);
  const getThemeMode = useSelector((state) => state.darkMode.on);
  const handleClickNavigation = () => {
    dispatch(getToggleNavigation(!getStatusNavigation));
  };
  const handleChangeMode = () => {
    dispatch(getToggleDarkMode(!getThemeMode));
  };

  return (
    <>
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
                  src="https://i.imgur.com/jStP8Cx.png"
                  width={40}
                  height={40}
                />
              </Box>
            </Link>
            <SearchInput />
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
            }}
          >
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
            <Box
              className="btn is-center"
              sx={{
                "&:hover": {
                  backgroundColor: "navigationItem.background.hover",
                },
              }}
            >
              <Link href="/code-editor">
                <Typography>Editor</Typography>
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default Header;
