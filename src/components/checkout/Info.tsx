
import React from 'react';
import { Typography, Box } from '@mui/material';

interface InfoProps {
  totalPrice: string;
}

const Info: React.FC<InfoProps> = ({ totalPrice }) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Order Summary
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Total: {totalPrice}
      </Typography>
    </Box>
  );
};

export default Info;
