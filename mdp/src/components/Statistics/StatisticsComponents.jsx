import { Typography, Card, CardContent, Box, CircularProgress, Divider } from '@mui/material';

// Circular Progress Card Component
export const CircularProgressCard = ({ title, value, maxValue, percentage, description }) => {
  return (
    <Card variant="outlined" className="flex-1 !rounded-3xl">
      <CardContent className="relative">
        <Typography className="text-lg">{title}</Typography>
        <Typography className="text-[10px] mb-4" variant="body2">
          {description}
        </Typography>
        <Box className="flex justify-center items-center my-2">
          <Box className="relative inline-flex">
            <CircularProgress
              variant="determinate"
              value={percentage}
              size={80}
              thickness={4}
              className="text-red-500"
            />
            <Box
              className="absolute top-0 left-0 bottom-0 right-0 flex items-center justify-center"
            >
              <Typography variant="h6" className="font-bold">
                {value}
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

// Progress Tab Component
export const ProgressTab = ({ label, selected, onClick }) => {
  return (
    <Box 
      onClick={onClick}
      className={`px-6 py-2 rounded-full cursor-pointer ${selected ? 'bg-gray-300' : 'bg-gray-200'}`}
    >
      <Typography className="text-sm">{label}</Typography>
    </Box>
  );
};

// Weight Progress Chart Component
export const WeightProgressChart = () => {
  return (
    <Card variant="outlined" className="w-full !rounded-3xl mt-4">
      <CardContent>
        <Typography className="text-lg mb-2">Courbe de progression</Typography>
        <Box className="h-40 w-full bg-gray-100 rounded-lg"></Box>
      </CardContent>
    </Card>
  );
};

// Diagnostic Item Component
export const DiagnosticItem = ({ label, value }) => {
  return (
    <Box className="flex flex-col items-center">
      <Typography className="text-sm text-gray-600">{label}</Typography>
      <Typography className="text-lg font-medium">{value}</Typography>
    </Box>
  );
};

// Diagnostic Section Component
export const DiagnosticSection = () => {
  return (
    <>
      <Typography variant="h6" className="mt-6 mb-2">Diagnostique</Typography>
      <Card variant="outlined" className="!rounded-3xl">
        <CardContent>
          <Box className="flex justify-between items-center">
            <DiagnosticItem label="IMC" value="21.9" />
            <Divider orientation="vertical" flexItem className="mx-2" />
            <DiagnosticItem label="Graisse" value="23.7%" />
            <Divider orientation="vertical" flexItem className="mx-2" />
            <DiagnosticItem label="Poids idéal" value="45 - 95 kg" />
          </Box>
        </CardContent>
      </Card>
    </>
  );
};