import { Box, Typography, CircularProgress } from "@mui/material";

const getColor = (value) => {
  if (value <= 4.9) {
    return 'rgb(255, 0, 0)'; // Red
  } else if (value <= 8) {
    return 'rgb(255, 255, 0)'; // Yellow
  } else {
    return 'rgb(0, 128, 0)'; // Green
  }
};

const CircularRate = ({ value }) => {
  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-block",
        width: "max-content"
      }}
    >
      <CircularProgress variant="determinate" value={value * 10} size={50} sx={{ color: getColor(value) }} />
      <Box
        sx={{
          position: "absolute",
          top: 0,
          bottom: 5,
          left: 0,
          right: 0,
          alignItems: "center",
          display: "flex",
          justifyContent: "center"
        }}
      >
        <Typography variant="caption" component="div" fontWeight="700">{value}</Typography>
      </Box>
    </Box>
  );
};

export default CircularRate;