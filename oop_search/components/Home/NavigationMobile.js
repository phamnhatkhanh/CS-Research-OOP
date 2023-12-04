import { getToggleDarkMode } from "@/redux/actions/_darkMode";
import ClearIcon from "@mui/icons-material/Clear";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { Box, IconButton, Typography } from "@mui/material";

import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
const NavigationMobile = ({ handleClickNavigation }) => {
  const dispatch = useDispatch();
  const getThemeMode = useSelector((state) => state.darkMode.on);

  const handleChangeMode = () => {
    dispatch(getToggleDarkMode(!getThemeMode));
  };
  return (
    <>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          backgroundColor: "#00000091",
          color: "text.color.first",
        }}
      >
        <Box
          sx={{
            height: "100vh",
            maxWidth: "350px",
            width: "100%",
            backgroundColor: "header.background.default",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              padding: "10px",
              gap: "10px",
              justifyContent: "space-between",
              borderBottom: "2px solid",
              borderBottomColor: "navigationItem.color.bottom",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                padding: "10px",
                gap: "10px",
              }}
            >
              <Link href="/">
                <Box>
                  <img
                    src="https://i.imgur.com/jStP8Cx.png"
                    width={40}
                    height={40}
                  />
                </Box>
              </Link>
              <Link href="/">
                <Typography
                  sx={{
                    fontWeight: "600",
                  }}
                >
                  TraCuuOOP
                </Typography>
              </Link>

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
            <Box>
              <IconButton onClick={handleClickNavigation}>
                <ClearIcon />
              </IconButton>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <Box
              className="btn is-center"
              sx={{
                "&:hover": {
                  backgroundColor: "navigationItem.background.hover",
                },
              }}
            >
              <Link href="/learn">
                <Typography>Tra cứu</Typography>
              </Link>
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
                <Typography>Code Editor</Typography>
              </Link>
            </Box>
            <Box
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
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default NavigationMobile;
