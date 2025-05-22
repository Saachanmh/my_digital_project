import { Typography, Card, CardContent, Box } from '@mui/material';
import LineGraph from './LineGraph';

const WeightProgressChart = () => {
  const weightData = [72,71,70.5]
  const weightDates = [
      new Date(2023, 0, 1),  // January 1, 2023
      new Date(2023, 1, 1),  // February 1, 2023
      new Date(2023, 2, 1),  // March 1, 2023
    ]
  return (
    <Card variant="outlined" className="w-full !rounded-3xl mt-4">
      <CardContent>
        <Typography className="text-lg mb-2">Courbe de progression</Typography>
        <Box className=" w-full bg-gray-100 rounded-lg">
          <LineGraph data={weightData} dates={weightDates}/>
          
        </Box>
      </CardContent>
    </Card>
  );
};

export default WeightProgressChart;