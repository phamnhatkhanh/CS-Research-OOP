import { languageOptions } from "@/constants/languageOptions";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
const LanguagesDropdown = ({ onSelectChange, value }) => {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="select-language">Language</InputLabel>
        <Select
          labelId="select-language"
          id="select-language"
          value={value}
          label="Language"
          onChange={(e) => onSelectChange(e.target.value)}
        >
          {languageOptions.map((item, i) => (
            <MenuItem value={item.id} key={item.id}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default LanguagesDropdown;
