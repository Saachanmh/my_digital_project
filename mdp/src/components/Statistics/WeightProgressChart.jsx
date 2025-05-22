import { Typography, Card, CardContent, Box } from '@mui/material';

const WeightProgressChart = () => {
  return (
    <Card variant="outlined" className="w-full !rounded-3xl mt-4">
      <CardContent>
        <Typography className="text-lg mb-2">Courbe de progression</Typography>
        <Box className="h-40 w-full bg-gray-100 rounded-lg"></Box>
      </CardContent>
    </Card>
  );
};

export default WeightProgressChart;