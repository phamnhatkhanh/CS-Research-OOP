"use client";
import { filterLanguague, languageOptions } from "@/constants/languageOptions";
import useKeyPress from "@/hooks/useKeyPress";
import { defineTheme } from "@/lib/defineTheme";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import btoa from "btoa";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CodeEditorWindow from "./CodeEditorWindow";
import CustomInput from "./CustomInput";
import LanguagesDropdown from "./LanguagesDropdown";
import OutputDetails from "./OutputDetails";
import OutputWindow from "./OutputWindow";
import ThemesDropdown from "./ThemesDropdown";
const javascriptDefault = `// some comment`;

import "react-reflex/styles.css";

const Landing = () => {
  const [code, setCode] = useState(javascriptDefault);
  const [customInput, setCustomInput] = useState("");
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(null);
  const [theme, setTheme] = useState("cobalt");
  const [language, setLanguage] = useState(languageOptions[5].id);
  const enterPress = useKeyPress("Enter");
  const ctrlPress = useKeyPress("Control");

  const onSelectChange = (sl) => {
    setLanguage(sl);
  };

  const onChange = (action, data) => {
    switch (action) {
      case "code": {
        setCode(data);
        break;
      }
      default: {
        console.warn("case not handled!", action, data);
      }
    }
  };
  const handleCompile = () => {
    setProcessing(true);
    const formData = {
      language_id: language,
      // encode source code in base64
      source_code: btoa(code),
      stdin: btoa(customInput),
    };
    const options = {
      method: "POST",
      url: process.env.NEXT_PUBLIC_RAPID_API_URL,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Host": process.env.NEXT_PUBLIC_RAPID_API_HOST,
        "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
      },
      data: formData,
    };

    axios
      .request(options)
      .then(function (response) {
        console.log("res.data", response.data);
        const token = response.data.token;
        checkStatus(token);
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err;
        setProcessing(false);
        console.log(error);
      });
  };

  const checkStatus = async (token) => {
    const options = {
      method: "GET",
      url: process.env.NEXT_PUBLIC_RAPID_API_URL + "/" + token,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Host": process.env.NEXT_PUBLIC_RAPID_API_HOST,
        "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
      },
    };
    try {
      let response = await axios.request(options);
      let statusId = response.data.status?.id;

      // Processed - we have a result
      if (statusId === 1 || statusId === 2) {
        // still processing
        setTimeout(() => {
          checkStatus(token);
        }, 2000);
        return;
      } else {
        setProcessing(false);
        setOutputDetails(response.data);

        console.log("response.data", response.data);
        return;
      }
    } catch (err) {
      console.log("err", err);
      setProcessing(false);
      showErrorToast();
    }
  };

  function handleThemeChange(th) {
    const theme = JSON.parse(th);
    if (["light", "vs-dark"].includes(theme)) {
      setTheme(theme);
    } else {
      defineTheme(theme.value).then((_) => setTheme(theme));
    }
  }
  useEffect(() => {
    defineTheme("oceanic-next").then((_) =>
      setTheme({
        label: "Oceanic Next",
        value: "oceanic-next",
        key: "oceanic-next",
      })
    );
  }, []);

  const showSuccessToast = (msg) => {
    toast.success(msg || `Compiled Successfully!`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const showErrorToast = (msg) => {
    toast.error(msg || `Something went wrong! Please try again.`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          width: "100%",
        }}
      >
        <Typography
          className="learn__title"
          component={"h1"}
          sx={{
            fontWeight: "700",
            fontSize: "3rem",
            margin: "20px 0",
          }}
        >
          Trình biên soạn code
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: "20px",
            alignItems: "flex-start",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <Box
            sx={{
              flex: 1,
              width: { xs: "100%", md: "70%" },
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: "10px",
              }}
            >
              <LanguagesDropdown
                onSelectChange={onSelectChange}
                value={language}
              />
              <ThemesDropdown
                handleThemeChange={handleThemeChange}
                value={theme}
              />
            </Box>
            <CodeEditorWindow
              code={code}
              onChange={onChange}
              language={filterLanguague(language)[0].value}
              theme={theme.value}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: { xs: "100%", md: "30%" },
              gap: "10px",
            }}
          >
            <OutputWindow outputDetails={outputDetails} />
            <CustomInput
              customInput={customInput}
              setCustomInput={setCustomInput}
            />
            <Box
              className="btn is-center"
              onClick={handleCompile}
              sx={{
                backgroundColor: "card.background.default",
                padding: "20px",
                borderRadius: "15px",
                border: "2px solid",
                borderColor: "card.background.border",
                pointerEvents: !code ? "none" : "",
                boxShadow: (theme) =>
                  `1px 2px 6px 0px ${theme.palette.backgroundCode.background.boxShadow}`,
                "&:hover": {
                  backgroundColor: "navigationItem.background.hover",
                },
              }}
            >
              {processing ? "Đang chạy..." : "Chạy chương trình"}
            </Box>

            {outputDetails && <OutputDetails outputDetails={outputDetails} />}
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default Landing;
