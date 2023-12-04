"use client";
import { getToggleDarkMode } from "@/redux/actions/_darkMode";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { createGlobalStyle } from "styled-components";
const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.palette.header.background.default};
  }
 
.MuiBackdrop-root {
  background-color:${({ theme }) => theme.palette.background.overlay} ;
}
.outline {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  border: 2px solid ${({ theme }) => theme.palette.border.dialog};
  border-radius: 10px;
}
.border-sidebar {
  
top: 0;
left: 0;
bottom: 0;
    right: 0;
    position: absolute;
    background-color: ${({ theme }) => theme.palette.background.menuItem};
    z-index: -1;
  &::before {
    content: "";
    right: -5px;
    background-color: ${({ theme }) => theme.palette.border.sidebar};
    width: 2px;
    position: absolute;
    height: 100%;
  }
}
pre {
   margin: 20px 0px;
    width: 100%;
    color: #ffffff;
    font-size: 2rem;
    padding: 1.5rem 1rem;
    overflow-x: auto;
    background-color: ${({ theme }) =>
      theme.palette.backgroundCode.background.default};
      box-shadow: ${({ theme }) =>
        `1px 2px 6px 3px ${theme.palette.backgroundCode.background.boxShadow}`};
    code {
      color: ${({ theme }) => theme.palette.backgroundCode.background.color};
      background-color: unset;
      font-weight: 500;
      &:before, &:after
    {
      content: "";
    }
    }
  }
    code {
    font-weight: 600;
    color: ${({ theme }) => theme.palette.backgroundCode.background.color};
    overflow-x: auto;
  
    &:before, &:after
    {
      content: "${"`"}";
    }
  } 
  ::-webkit-scrollbar-thumb {
  background-color:  ${({ theme }) =>
    theme.palette.scrollBar.background.default};
  &:hover {
    background-color:  ${({ theme }) =>
      theme.palette.scrollBar.background.hover};
  }
}
`;

const getDesignTokens = (mode) => ({
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.button.default,

          border: "2px solid #ccc",
          minWidth: "100px",
          padding: "6px 12px",
          textTransform: "capitalize",
          borderRadius: "20px",

          fontWeight: "bold",
          cursor: "pointer",
          fontSize: "1.8rem",
          "&:hover": {
            backgroundColor: "#f4f4f4",
            opacity: 0.8,
          },
        }),
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: ({ theme }) => ({
          "& .MuiFormHelperText-root": {
            fontSize: "1.2rem",
          },
        }),
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: ({ theme }) => ({
          width: "100%",
          margin: "0",
          maxWidth: "600px",
        }),
      },
    },
  },
  typography: {
    fontSize: 25,

    fontFamily: ["Noto Sans", "Inter", "sans-serif"].join(","),
  },
  palette: {
    mode,
    primary: {
      ...(mode === "dark"
        ? {
            main: "#f9f7f0",
          }
        : {
            main: "#080808",
          }),
    },
    background: {
      ...(mode === "dark"
        ? {
            first: "#e1e1e1",
            second: "#c9adc5",
            third: "#cb8daf",
            dialog: "#17191f",
            overlay: "#ffffff3d",
            buttonOption: "#575c5c73",
            buttonOptionHover: "#00000029",
            menuItem: "#20262d",
            menuItemHover: "#393e44",
          }
        : {
            first: "#e1e1e1",
            second: "#c9adc5",
            third: "#cb8daf",
            dialog: "#edf0f7",
            overlay: "#0e12173d",
            buttonOption: "#fd6b2229",
            buttonOptionHover: "#fd6b2229",
            menuItem: "#eaebec",
            menuItemHover: "#eaebec",
          }),
    },
    header: {
      background: {
        ...(mode === "light"
          ? {
              default: "#ffffff",
            }
          : {
              default: "#232730",
            }),
      },
    },
    body: {
      background: {
        ...(mode === "light"
          ? {
              default: "#ffffff",
            }
          : {
              default: "#23272f",
            }),
      },
    },
    scrollBar: {
      background: {
        ...(mode === "light"
          ? {
              default: "#c0c0c0",
              hover: "#686868",
            }
          : {
              default: "#686868",
              hover: "#c0c0c0",
            }),
      },
    },
    navigationItem: {
      background: {
        ...(mode === "light"
          ? {
              active: "#e6f7ff",
              hover: "#f6f7f9",
            }
          : {
              active: "#283541",
              hover: "#343a46",
            }),
      },
      color: {
        ...(mode === "light"
          ? {
              phanLoai: "#5e687e",
              bottom: "#f2f3f6",
            }
          : {
              phanLoai: "#99a1b3",
              bottom: "#353535",
            }),
      },
    },
    card: {
      background: {
        ...(mode === "light"
          ? {
              default: "#f6f7f9",
              border: "#e5e7eb",
            }
          : {
              default: "#343a46",
              border: "#363b47",
            }),
      },
    },
    backgroundCode: {
      background: {
        ...(mode === "light"
          ? {
              default: "#ffffff",
              border: "#e5e7eb",
              color: "#6c6f73",
              boxShadow: "#d0d0d0",
            }
          : {
              default: "#16181d",
              border: "#363b47",
              color: "#dddddd",
              boxShadow: "#292828",
            }),
      },
    },
    border: {
      ...(mode === "dark"
        ? {
            first: "#e1e1e1",
            second: "#c9adc5",
            third: "#cb8daf",
            dialog: "#a8b3cf33",

            dialogHover: "#a8b3cf66",
            sidebar: "#6176f3",
            feeds: "#ffffff",
            menuright_option: "#d8e4f2",
          }
        : {
            first: "#e1e1e1",
            second: "#c9adc5",
            third: "#cb8daf",
            dialog: "#52586633",
            dialogHover: "#52586666",
            sidebar: "#6176f3",
            feeds: "#ffffff",
            menuright_option: "#d8e4f2",
          }),
    },
    iconColor: {
      ...(mode === "dark"
        ? {
            default: "#a8b3cf",
            hover: "#ffffff",
          }
        : {
            default: "#525866",
            hover: "black",
          }),
    },
    box: {
      ...(mode === "dark"
        ? {
            background: {
              default: "#0e1217",
            },
            shadow: {
              default: "#d1d1d1",
            },
          }
        : {
            background: {
              default: "#ffffff",
            },
            shadow: {
              default: "#d1d1d1",
            },
          }),
    },
    button: {
      ...(mode === "dark"
        ? {
            default: "#20b8fb",
            background: {
              first: "#0e1217",
              iconHeart: "#d61168",
              iconUnheart: "#4078d6",

              iconOthers: "#12432c",
              iconSave: "#39184a",

              hover: "#1a1f25",
            },
            color: {
              first: "#ffffff",
            },
          }
        : {
            default: "#20b8fb",
            background: {
              first: "#ffffff",
              hover: "#e8ecf9",
              iconHeart: "#ffecf7",
              iconUnheart: "#a8d7fd",
              iconOthers: "#1ddc6f3d",
              iconSave: "#f0ccfb",
            },
            color: {
              first: "#25396f",
            },
          }),
    },
    notification: {
      ...(mode === "dark"
        ? {
            background: {
              first: "#1c1f26",
              new: "#152d40",
              arrow: "#a8b3cf66",
              optionMenu: "#0e1217",
            },
            color: {
              first: "#ffffff",
              second: "#a4b6e1",
              optionMenuHover: "#9296a0",
            },
            boxShadow: {
              optionMenu: "#2f2c2c82",
            },
            borderRadius: "5px",
          }
        : {
            background: {
              first: "#ffffff",
              arrow: "#52586666",
              new: "#e9f5fd",
              optionMenu: "#ffffff",
            },
            color: {
              first: "#25396f",
              second: "#a4b6e1",
              optionMenuHover: "#1c1f26",
            },
            boxShadow: {
              optionMenu: "#cccccc82",
            },
            borderRadius: "5px",
          }),
    },
    feed: {
      ...(mode === "dark"
        ? {
            title: {
              background: {
                default: "#1a1f26",
                hover: "#a8b3cf1f",
                active: "transparent",
              },
              border: {
                default: "#1a1f26",
                hover: "#a8b3cf1f",
                active: "#ffffff",
              },
            },
            background: {
              first: "#1c1f26",
              new: "#152d40",
              arrow: "#a8b3cf66",
              optionMenu: "#0e1217",
            },
            color: {
              first: "#ffffff",
              second: "#a4b6e1",
              optionMenuHover: "#9296a0",
            },
            boxShadow: {
              optionMenu: "#2f2c2c82",
            },
            borderRadius: "5px",
          }
        : {
            title: {
              background: {
                default: "#52586614",
                hover: "#5258661f",
                active: "transparent",
              },
              border: {
                default: "#1a1f26",
                hover: "#a8b3cf1f",
                active: "#000000",
              },
            },
            background: {
              first: "#f0f5fd",
              arrow: "#52586666",
              new: "#e9f5fd",
              optionMenu: "#ffffff",
            },
            color: {
              first: "#25396f",
              second: "#a4b6e1",
              optionMenuHover: "#1c1f26",
            },
            boxShadow: {
              optionMenu: "#cccccc82",
            },
            borderRadius: "5px",
          }),
    },
    accountOptionMenu: {
      ...(mode === "dark"
        ? {
            background: {
              first: "#0e1217",
              new: "#152d40",
              arrow: "#a8b3cf66",
              optionMenu: "#0e1217",
              hover: "#1c1f26",
            },
            color: {
              first: "#ffffff",
              second: "#a4b6e1",
              optionMenuHover: "#9296a0",
            },
            boxShadow: {
              optionMenu: "#2f2c2c82",
            },
            borderRadius: "5px",
          }
        : {
            background: {
              first: "#ffffff",
              arrow: "#52586666",
              new: "#e9f5fd",
              optionMenu: "#ffffff",
              hover: "#e8ecf9",
            },
            color: {
              first: "#25396f",
              second: "#a4b6e1",
              optionMenuHover: "#1c1f26",
            },
            boxShadow: {
              optionMenu: "#cccccc82",
            },
            borderRadius: "5px",
          }),
    },
    latestPost: {
      ...(mode === "dark"
        ? {
            background: {
              first: "#1c1f26",
              new: "#152d40",
              arrow: "#a8b3cf66",
              optionMenu: "#0e1217",
            },
            color: {
              first: "#ffffff",
              second: "#a4b6e1",
              optionMenuHover: "#9296a0",
            },
            boxShadow: {
              optionMenu: "#2f2c2c82",
            },
            borderRadius: "5px",
          }
        : {
            background: {
              first: "#f0f5fd",
              arrow: "#52586666",
              new: "#e9f5fd",
              optionMenu: "#ffffff",
            },
            color: {
              first: "#25396f",
              second: "#a4b6e1",
              optionMenuHover: "#1c1f26",
            },
            boxShadow: {
              optionMenu: "#cccccc82",
            },
            borderRadius: "5px",
          }),
    },
    sidebar: {
      ...(mode === "dark"
        ? {
            background: {
              default: "#0e1217",
            },
            border: "#a8b3cf",
            activeIcon: "#6176f3",
            normalIcon: "#999",
          }
        : {
            background: {
              default: "#ffffff",
            },
            boxShadow: "#cccccc12",
            border: "#ccc",
            activeIcon: "#6176f3",
            normalIcon: "#999",
          }),
    },
    feeds: {
      ...(mode === "dark"
        ? {
            boxShadow: "#c3cddbab;",
          }
        : {
            boxShadow: "#c3cddbab;",
          }),
    },

    musicplayer: {
      ...(mode === "dark"
        ? {
            default: "#323844",
          }
        : {
            default: "#323844",
          }),
    },
    boxitem: {
      ...(mode === "dark"
        ? {
            backgroundColor: {
              default: "#323844",
            },
            borderRadius: {
              default: "10px",
            },
          }
        : {
            backgroundColor: {
              default: "#323844",
            },
            borderRadius: {
              default: "10px",
            },
          }),
    },
    text: {
      ...(mode === "dark"
        ? {
            color: {
              first: "#ffffff",
              second: "#a4b6e1",
              active: "#a974ff",
            },
            fontSize: {
              first: "16px",
              second: "14px",
            },
          }
        : {
            color: {
              first: "#25396f",
              second: "#a4b6e1",
              active: "#a974ff",
            },
            fontSize: {
              first: "16px",
              second: "14px",
            },
          }),
    },
  },
});
const ThemeLayout = (props) => {
  const getThemeMode = useSelector((state) => state.darkMode.on);
  const dispatch = useDispatch();

  const [isDarkMode, setIsDarkMode] = useState(false);
  useEffect(() => {
    const getTheme = JSON.parse(localStorage.getItem("darkMode")) || false;

    dispatch(getToggleDarkMode(getTheme));
  }, []);
  useEffect(() => {
    localStorage.setItem("darkMode", getThemeMode);
    setIsDarkMode(getThemeMode);
  }, [getThemeMode]);
  const theme = createTheme(getDesignTokens(isDarkMode ? "dark" : "light"));

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle theme={theme} />

        {props.children}

        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover={false}
        />
      </ThemeProvider>
    </>
  );
};
export default ThemeLayout;
