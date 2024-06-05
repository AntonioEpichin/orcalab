import React from 'react';
import { TextField, Grid, Box } from '@mui/material';

const AddressForm: React.FC = () => {
  return (
    <Box component="form" noValidate sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="firstName"
            label="First Name"
            name="firstName"
            autoComplete="given-name"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            autoComplete="family-name"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="address1"
            label="Address Line 1"
            name="address1"
            autoComplete="shipping address-line1"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="address2"
            label="Address Line 2"
            name="address2"
            autoComplete="shipping address-line2"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="city"
            label="City"
            name="city"
            autoComplete="shipping address-level2"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="zip"
            label="Zip / Postal code"
            name="zip"
            autoComplete="shipping postal-code"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddressForm;
