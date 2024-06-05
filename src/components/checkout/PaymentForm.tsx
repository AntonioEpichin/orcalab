import React from 'react';
import { TextField, Grid, Box } from '@mui/material';

const PaymentForm: React.FC = () => {
  return (
    <Box component="form" noValidate sx={{ mt: 3 }}>
      <TextField
        required
        fullWidth
        id="cardName"
        label="Name on Card"
        name="cardName"
        autoComplete="cc-name"
      />
      <TextField
        required
        fullWidth
        id="cardNumber"
        label="Card Number"
        name="cardNumber"
        autoComplete="cc-number"
        margin="normal"
      />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="expDate"
            label="Expiry Date"
            name="expDate"
            autoComplete="cc-exp"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="cvv"
            label="CVV"
            name="cvv"
            autoComplete="cc-csc"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default PaymentForm;
