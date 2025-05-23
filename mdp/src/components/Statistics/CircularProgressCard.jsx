import { Typography, Card, CardContent, Box, CircularProgress } from '@mui/material';

const CircularProgressCard = ({ title, value, maxValue, percentage, description }) => {
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

export default CircularProgressCard;