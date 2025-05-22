import { Typography, Box } from '@mui/material';

const DiagnosticItem = ({ label, value }) => {
  return (
    <Box className="flex flex-col items-center">
      <Typography className="text-sm text-gray-600">{label}</Typography>
      <Typography className="text-lg font-medium">{value}</Typography>
    </Box>
  );
};

export default DiagnosticItem;