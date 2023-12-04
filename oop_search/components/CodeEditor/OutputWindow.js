import { Box, Typography } from "@mui/material";

const OutputWindow = ({ outputDetails }) => {
  const getOutput = () => {
    let statusId = outputDetails?.status?.id;

    if (statusId === 6) {
      // compilation error
      return (
        <code className="text-red-500">
          {atob(outputDetails?.compile_output)}
        </code>
      );
    } else if (statusId === 3) {
      return (
        <code className="text-green-500">
          {atob(outputDetails.stdout) !== null
            ? `${atob(outputDetails.stdout)}`
            : null}
        </code>
      );
    } else if (statusId === 5) {
      return <code className="text-red-500">{`Time Limit Exceeded`}</code>;
    } else {
      return (
        <code className="text-red-500">{atob(outputDetails?.stderr)}</code>
      );
    }
  };
  return (
    <>
      <Typography
        sx={{
          fontWeight: "700",
          fontSize: "2.5rem",
        }}
      >
        Output
      </Typography>
      <Box
        sx={{
          width: "100%",
          height: "200px",
        }}
        component={"pre"}
      >
        {outputDetails ? <>{getOutput()}</> : null}
      </Box>
    </>
  );
};

export default OutputWindow;
