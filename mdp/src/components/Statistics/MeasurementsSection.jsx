import { useState } from 'react';
import { Typography, Card, CardContent, Box, TextField, Grid } from '@mui/material';

const MeasurementsSection = () => {
  // État pour stocker les valeurs des mensurations
  const [measurements, setMeasurements] = useState({
    epaules: '',
    avantBras: '',
    bras: '',
    taille: '',
    hanche: '',
    jambe: ''
  });

  // Gestion des changements dans les champs de saisie
  const handleChange = (field) => (event) => {
    setMeasurements({
      ...measurements,
      [field]: event.target.value
    });
  };

  return (
    <Card variant="outlined" className="w-full !rounded-3xl mt-4">
      <CardContent>
        <Grid>
          {/* Première colonne de mesures */}
          <Grid item xs={12} md={6}>
            <Box className="flex flex-col gap-4">
              {/* Épaules */}
              <Box className="flex items-center justify-between">
                <Typography className="w-24 mr-2">Épaules</Typography>
                <TextField
                    className='w-20'

                  variant="outlined"
                  value={measurements.epaules}
                  onChange={handleChange('epaules')}
                  InputProps={{ endAdornment: <Typography>cm</Typography> }}
                  size="small"
                />
              </Box>
              
              {/* Avant-bras */}
              <Box className="flex items-center justify-between">
                <Typography className="w-24 mr-2">Avant-bras</Typography>
                <TextField
                    className='w-20'

                  variant="outlined"
                  value={measurements.avantBras}
                  onChange={handleChange('avantBras')}
                  InputProps={{ endAdornment: <Typography>cm</Typography> }}
                  size="small"
                />
              </Box>
              
              {/* Bras */}
              <Box className="flex items-center justify-between">
                <Typography className="w-24 mr-2">Bras</Typography>
                <TextField
                    className='w-20'

                  variant="outlined"
                  value={measurements.bras}
                  onChange={handleChange('bras')}
                  InputProps={{ endAdornment: <Typography>cm</Typography> }}
                  size="small"
                />
              </Box>
              {/* Taille */}
              <Box className="flex items-center justify-between">
                <Typography className="w-24 mr-2">Taille</Typography>
                <TextField
                    className='w-20'
                    variant="outlined"
                    value={measurements.taille}
                    onChange={handleChange('taille')}
                    InputProps={{ endAdornment: <Typography>cm</Typography> }}
                    size="small"
                />
              </Box>
              
              {/* Hanche */}
              <Box className="flex items-center justify-between">
                <Typography className="w-24 mr-2">Hanche</Typography>
                <TextField
                    className='w-20'

                  variant="outlined"
                  value={measurements.hanche}
                  onChange={handleChange('hanche')}
                  InputProps={{ endAdornment: <Typography>cm</Typography> }}
                  size="small"
                />
              </Box>
              
              {/* Jambe */}
              <Box className="flex items-center justify-between">
                <Typography className="w-24 mr-2">Jambe</Typography>
                <TextField
                    className='w-20'

                  variant="outlined"
                  value={measurements.jambe}
                  onChange={handleChange('jambe')}
                  InputProps={{ endAdornment: <Typography>cm</Typography> }}
                  size="small"
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default MeasurementsSection;