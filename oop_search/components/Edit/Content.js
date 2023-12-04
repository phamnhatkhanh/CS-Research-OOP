"use client";

import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
const Content = () => {
  const editorRef = useRef();
  const { CKEditor, ClassicEditor } = editorRef.current || {};

  const [dataPhanLoai, setDataPhanLoai] = useState([]);
  const [dataPhanMuc, setDataPhanMuc] = useState([]);
  const [dataChuongHoc, setDataChuongHoc] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [dataContent, setDataContent] = useState("");
  const [tenBaiHoc, setTenBaiHoc] = useState("");
  const [phanLoai, setPhanLoai] = useState("");
  const [chuongHoc, setChuongHoc] = useState("");
  const [phanMuc, setPhanMuc] = useState("");
  //
  useEffect(() => {
    console.log(process.env.NEXT_PUBLIC_ENDPOINT_SERVER);
    const getAllData = async () => {
      try {
        setIsLoading(true);
        const resultsPhanLoai = await axios.get(
          `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/phanloai`
        );
        setDataPhanLoai(resultsPhanLoai.data.data);
        const resultsChuongHoc = await axios.get(
          `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/chuonghoc`
        );
        setDataChuongHoc(resultsChuongHoc.data.data);
        const resultsPhanMuc = await axios.get(
          `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/phanmuc`
        );
        setDataPhanMuc(resultsPhanMuc.data.data);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        if (err.response) {
          toast.error(err.response.data.message);
        }
      }
    };

    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, // v3+
      ClassicEditor: require("@/ckeditor5-34.1.0-8ogafsbogmr7"),
    };
    setEditorLoaded(true);
    getAllData();
  }, []);
  const handleChangePhanMuc = (event) => {
    setPhanMuc(event.target.value);
  };
  const handleChangeChuongHoc = (event) => {
    setChuongHoc(event.target.value);
  };
  const handleChangePhanLoai = (event) => {
    setPhanLoai(event.target.value);
  };
  const handleSubmit = async () => {
    try {
      setIsLoading(true);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/baihoc`,
        {
          phanMuc: phanMuc,
          tenBaiHoc: tenBaiHoc,
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
        {dataPhanLoai.length > 0 && (
          <FormControl
            variant="standard"
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography>Phân loại</Typography>
            <Select
              value={phanLoai}
              label="Phân loại"
              onChange={handleChangePhanLoai}
            >
              {dataPhanLoai.map((item, i) => (
                <MenuItem key={item._id} value={item._id}>
                  {item.tenPhanLoai}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        {dataChuongHoc.length > 0 && (
          <FormControl
            variant="standard"
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography>Tên chương</Typography>

            <Select
              value={chuongHoc}
              label="Chương học"
              onChange={handleChangeChuongHoc}
            >
              {dataChuongHoc.map((item, i) => (
                <MenuItem key={item._id} value={item._id}>
                  {item.tenChuongHoc}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        {dataPhanMuc.length > 0 && (
          <FormControl
            variant="standard"
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography>Tên phân mục</Typography>

            <Select
              value={phanMuc}
              label="Phân mục"
              onChange={handleChangePhanMuc}
            >
              {dataPhanMuc.map((item, i) => (
                <MenuItem key={item._id} value={item._id}>
                  {item.tenPhanMuc}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        <FormControl
          variant="standard"
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography>Tên bài học</Typography>

          <TextField
            value={tenBaiHoc}
            onChange={(e) => setTenBaiHoc(e.target.value)}
            size="small"
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {tenBaiHoc.length}/300
                </InputAdornment>
              ),
            }}
          />
        </FormControl>
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
                config={{}}
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
export default Content;
