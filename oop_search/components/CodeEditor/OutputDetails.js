import { Box } from "@mui/material";
const OutputDetails = ({ outputDetails }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        fontSize: "1.5rem",
      }}
    >
      <p>
        Status:{" "}
        <span className="font-semibold px-2 py-1 rounded-md">
          {outputDetails?.status?.description}
        </span>
      </p>
      <p>
        Memory:{" "}
        <span className="font-semibold px-2 py-1 rounded-md">
          {outputDetails?.memory}
        </span>
      </p>
      <p>
        Time:{" "}
        <span className="font-semibold px-2 py-1 rounded-md">
          {outputDetails?.time}
        </span>
      </p>
    </Box>
  );
};

export default OutputDetails;
