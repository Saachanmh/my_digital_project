import { useState } from 'react';
import { Typography, Box } from '@mui/material';
import CircularProgressCard from '../components/Statistics/CircularProgressCard';
import  ProgressTab from '../components/Statistics/ProgressTab'
import WeightProgressChart from '../components/Statistics/WeightProgressChart'
import DiagnosticSection from '../components/Statistics/DiagnosticSection'
import MeasurementsSection from '../components/Statistics/MeasurementsSection'


const StatistiquesPage = () => {
  const [selectedTab, setSelectedTab] = useState('poids');

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const tabsContent = {
    'poids':{
      title: 'Poids',
      component: <WeightProgressChart />
    },
    'mesure':{
      title: 'Mensurations',
      component: <MeasurementsSection />
    },
    'avance':{
      title: 'Statistiques avancées',
      component: <Typography variant="body1">Contenu à venir</Typography>
    }
  }

  return (
    <Box className="w-full p-4 pb-24">
      <h1 className="font-display text-2xl mb-4">Statistiques</h1>

      {/* Calorie and Objective Cards */}
      <Box className="flex gap-8 mb-10">
        <CircularProgressCard
          title="Votre dépense kcal"
          value={550}
          maxValue={1000}
          percentage={55}
          description="Votre dépense calorique ne fait que d'augmenter ces derniers temps ! Voici votre dépense de la semaine"
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
      <Box className="flex gap-1 mb-4 justify-center">
        <ProgressTab
          className="flex-1"
          label="Poids"
          selected={selectedTab === 'poids'}
          onClick={() => handleTabChange('poids')}
        />
        <ProgressTab
          className="flex-1"

          label="Mesure"
          selected={selectedTab === 'mesure'}
          onClick={() => handleTabChange('mesure')}
        />
        <ProgressTab
          className="flex-1"

          label="Avance"
          selected={selectedTab === 'avance'}
          onClick={() => handleTabChange('avance')}
        />
      </Box>

      {/* Weight Progress Section */}
      <div className='mb-4'>
        {tabsContent[selectedTab]?.component}
      </div>


      {/* Diagnostic Section */}
      <DiagnosticSection />
    </Box>
  );
};

export default StatistiquesPage;
