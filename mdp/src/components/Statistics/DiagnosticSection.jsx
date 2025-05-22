import { Typography, Card, CardContent, Box, Divider } from '@mui/material';
import DiagnosticItem from './DiagnosticItem';

const DiagnosticSection = () => {
  return (
    <>
      <Typography variant="h6" className="mt-6 mb-2">Diagnostique</Typography>
      <Card variant="outlined" className="!rounded-3xl">
        <CardContent>
          <Box className="flex justify-evenly items-center">
            <DiagnosticItem label="IMC" value="21.9" />
            <Divider orientation="vertical" flexItem className="mx-2" />
            <DiagnosticItem label="Graisse" value="23.7%" />
            <Divider orientation="vertical" flexItem className="mx-2" />
            <DiagnosticItem label="Poids" value="70 kg" />
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default DiagnosticSection;