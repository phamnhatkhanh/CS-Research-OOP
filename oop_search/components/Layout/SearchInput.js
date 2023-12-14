"use client";
import SearchIcon from "@mui/icons-material/Search";
import { Box, CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
const SearchInput = () => {
  const router = useRouter();
  let timeRef = useRef(null);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleChangeSeachValue = (e) => {
    setSearchValue(e.target.value);
    if (e.target.value === "") {
      clearTimeout(timeRef.current);
      setIsLoading(false);
      router.push(`/learn/`);
      return;
    }
    clearTimeout(timeRef.current);
    setIsLoading(true);
    timeRef.current = setTimeout(() => {
      router.push(`/learn/search?search=${e.target.value}`);
      setIsLoading(false);
    }, 1000);
  };
  return (
    <>
      <Box
        className="btn"
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          backgroundColor: "card.background.default",
          flex: 1,
          gap: "10px",
          color: "#a5adbb",
        }}
      >
        <SearchIcon></SearchIcon>
        <input
          component="input"
          type="text"
          placeholder="Search"
          className="input-search"
          value={searchValue}
          onChange={handleChangeSeachValue}
        ></input>
        {isLoading && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress color="inherit" size={20} />
          </Box>
        )}
      </Box>
    </>
  );
};
export default SearchInput;
