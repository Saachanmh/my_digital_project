import { Typography, Box } from '@mui/material';

const ProgressTab = ({ label, selected, onClick }) => {
  return (
    <Box 
      onClick={onClick}
      className={`px-6 py-2 flex-1 flex justify-center rounded-full cursor-pointer ${selected ? 'bg-gray-300' : 'bg-gray-200'}`}
    >
      <h2 className="text-md font-display">{label}</h2>
    </Box>
  );
};

export default ProgressTab;