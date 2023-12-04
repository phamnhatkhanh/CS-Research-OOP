import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import monacoThemes from "monaco-themes/themes/themelist";
const ThemesDropdown = ({ handleThemeChange, value }) => {
  console.log(value);
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="select-theme">Theme</InputLabel>
        <Select
          labelId="select-theme"
          id="select-theme"
          value={JSON.stringify(value)}
          label="Theme"
          onChange={(e) => handleThemeChange(e.target.value)}
        >
          {Object.entries(monacoThemes).map(([themeId, themeName]) => (
            <MenuItem
              value={JSON.stringify({
                label: themeName,
                value: themeId,
                key: themeId,
              })}
              key={themeId}
            >
              {themeName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default ThemesDropdown;
