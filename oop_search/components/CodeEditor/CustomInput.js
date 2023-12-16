import { classnames } from "@/utils/general";
import { Box } from "@mui/material";
const CustomInput = ({ customInput, setCustomInput }) => {
  return (
    <>
      {" "}
      <Box
        sx={{
          backgroundColor: "card.background.default",
          padding: "10px",
          borderRadius: "15px",
          border: "2px solid",
          borderColor: "card.background.border",
          boxShadow: (theme) =>
            `1px 2px 6px 0px ${theme.palette.backgroundCode.background.boxShadow}`,
        }}
        component={"textarea"}
        rows="7"
        value={customInput}
        onChange={(e) => setCustomInput(e.target.value)}
        placeholder={`Nhập dữ liệu từ bàn phím`}
        className={classnames(
          "focus:outline-none w-full z-10 rounded-md transition duration-200 mt-2"
        )}
      ></Box>
    </>
  );
};
export default CustomInput;
