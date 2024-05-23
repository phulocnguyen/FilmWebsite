import { Select, MenuItem, FormHelperText, FormControl } from "@mui/material";

export default function FilterBox({
  title,
  options,
  onOptionChange,
}) {
  const ITEM_HEIGHT = 50;
  const ITEM_PADDING_TOP = 10;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 235,
      },
    },
  };
  return (
    <FormControl>
      <FormHelperText
        sx={{
          fontFamily: '"Roboto", san serif',
          fontWeight: "500",
          textTransform: "capitalize",
          margin: "0.3em 0 0.3em 0.4em",
        }}
      >
        {title}
      </FormHelperText>
      <Select
        defaultValue={options[0]}
        displayEmpty
        sx={{ margin: "0 0.3em 0.3em" }}
        size="small"
        MenuProps={MenuProps}
        onChange={(event) => onOptionChange(event.target.value)}
      >
        {options.map((option, index) => (
          <MenuItem key={index} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
