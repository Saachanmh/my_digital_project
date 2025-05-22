import { useState } from 'react';
import { Typography, Box } from '@mui/material';
import {
  CircularProgressCard,
  ProgressTab,
  WeightProgressChart,
  DiagnosticSection
} from '../components/Statistics/StatisticsComponents';

const StatistiquesPage = () => {
  const [selectedTab, setSelectedTab] = useState('poids');

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <Box className="p-4">
      <Typography variant="h5" className="font-bold mb-4">Statistiques</Typography>
      
      {/* Calorie and Objective Cards */}
      <Box className="flex gap-4 mb-4">
        <CircularProgressCard
          title="Votre dépense kcal"
          value={550}
          maxValue={1000}
          percentage={55}
          description="Votre dépense calorique ne que d'augmentez ces derniers temps ! Voici votre dépense de la semaine"
        />
        <CircularProgressCard
          title="Votre objectif"
          value="25%"
          maxValue={100}
          percentage={25}
          description="Gardez votre rythme vous êtes proche de vos objectifs"
        />
      </Box>
      
      {/* Tabs */}
      <Box className="flex gap-2 mb-4">
        <ProgressTab 
          label="Poids" 
          selected={selectedTab === 'poids'} 
          onClick={() => handleTabChange('poids')} 
        />
        <ProgressTab 
          label="Mesure" 
          selected={selectedTab === 'mesure'} 
          onClick={() => handleTabChange('mesure')} 
        />
        <ProgressTab 
          label="Avance" 
          selected={selectedTab === 'avance'} 
          onClick={() => handleTabChange('avance')} 
        />
      </Box>
      
      {/* Weight Progress Section */}
      {selectedTab === 'poids' && (
        <>
          <Typography variant="h6" className="mt-4 mb-2">Poids</Typography>
          <WeightProgressChart />
        </>
      )}
      
      {/* Diagnostic Section */}
      <DiagnosticSection />
    </Box>
  );
};

export default StatistiquesPage;
