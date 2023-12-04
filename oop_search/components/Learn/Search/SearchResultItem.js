import ContentPasteOutlinedIcon from "@mui/icons-material/ContentPasteOutlined";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
const SearchResultItem = ({ tenKetQua, slugKetQua, idKetQua }) => {
  return (
    <>
      <Link href={slugKetQua}>
        <Box
          sx={{
            borderTopRightRadius: "20px",
            borderBottomRightRadius: "20px",
            fontWeight: 500,
            padding: "8px 10px",
            display: "flex",
            gap: "5px",
            alignItems: "center",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "#087ea4",
              borderTopRightRadius: "20px",
              borderBottomRightRadius: "20px",
              color: "#fff",
            },
          }}
        >
          <ContentPasteOutlinedIcon />
          <Typography sx={{}}>{tenKetQua}</Typography>
        </Box>
      </Link>
    </>
  );
};
export default SearchResultItem;
