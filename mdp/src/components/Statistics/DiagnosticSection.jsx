import { Typography, Card, CardContent, Box, Divider } from '@mui/material';
import DiagnosticItem from './DiagnosticItem';

const DiagnosticSection = () => {
  return (
    <>
      <Card variant="outlined" className="!rounded-3xl">
        <CardContent>
        <h2 className="font-display font-bold text-lg mb-4">Diagnostic</h2>
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