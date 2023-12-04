"use client";

import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
const Edit = ({ data }) => {
  const editorRef = useRef();
  const { CKEditor, ClassicEditor } = editorRef.current || {};

  const [isLoading, setIsLoading] = useState(false);
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [dataContent, setDataContent] = useState(data ? data.noiDung : "");
  const [tenBaiHoc, setTenBaiHoc] = useState("");

  const [phanMuc, setPhanMuc] = useState("");
  //
  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, // v3+
      ClassicEditor: require("@/ckeditor5-34.1.0-8ogafsbogmr7"),
    };
    setEditorLoaded(true);
  }, []);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/baihoc/edit`,
        {
          idBaiHoc: data._id,
          noiDung: dataContent,
        }
      );

      toast.success(response.data.message);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      if (err.response) {
        console.log(err.response.data.message);
      }
    }
  };
  const ErrorContent = styled(Typography)({
    fontWeight: "400",
    fontSize: "1.2rem",
    lineHeight: 1.66,
    textAlign: "left",
    margin: "4px 14px 0 14px",
    color: "#f44336",
  });
  return (
    <>
      <Backdrop sx={{ color: "#fff", zIndex: 99999 }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography className="learn__title">Sửa bài học</Typography>

        {!editorLoaded && <div>Editor loading</div>}
        {editorLoaded && (
          <Box
            sx={{
              width: "100%",
              color: "black",
            }}
          >
            <Typography>Nội dung</Typography>
            <Box
              sx={{
                width: "100%",
                maxWidth: "900px",
                color: "black",
                pt: 2,
                fontSize: "2rem",
              }}
            >
              <CKEditor
                editor={ClassicEditor}
                data={dataContent}
                onReady={(editor) => {
                  // You can store the "editor" and use when it is needed.
                }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setDataContent(data);
                  console.log(data);
                  localStorage.setItem("content-post", data);
                }}
              />
            </Box>
          </Box>
        )}
        <Box
          onClick={() => handleSubmit()}
          sx={{
            marginTop: "10px",
          }}
        >
          <Button>Lưu</Button>
        </Box>
      </Box>
    </>
  );
};
export default Edit;
