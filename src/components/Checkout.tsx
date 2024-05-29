'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import dynamic from "next/dynamic";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#418041',  // Main green color
    }
  }
});

function Checkout() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      cardholderName: data.get('cardholderName'),
      email: data.get('email'),
      cpf: data.get('cpf'),
      phone: data.get('phone'),
      zipCode: data.get('zipCode'),
      addressNumber: data.get('addressNumber'),
      cardNumber: data.get('cardNumber'),
      cardExpiryMonth: data.get('cardExpiryMonth'),
      cardExpiryYear: data.get('cardExpiryYear'),
      cardCVV: data.get('cardCVV'),
      termsAccepted: data.get('termsAccepted'),
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Pagamento
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="cardholderName"
              label="Nome impresso no cartão"
              name="cardholderName"
              autoComplete="cc-name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="E-mail do titular"
              name="email"
              type="email"
              autoComplete="email"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="cpf"
              label="CPF do titular"
              name="cpf"
              autoComplete="cpf"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="phone"
              label="Telefone do titular"
              name="phone"
              type="tel"
              autoComplete="tel"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="zipCode"
              label="CEP do titular"
              name="zipCode"
              autoComplete="postal-code"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="addressNumber"
              label="Número"
              name="addressNumber"
              type="number"
              autoComplete="address-line1"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="cardNumber"
              label="Número do cartão"
              name="cardNumber"
              autoComplete="cc-number"
            />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  name="cardExpiryMonth"
                  label="Mês de validade"
                  type="number"
                  id="cardExpiryMonth"
                  autoComplete="cc-exp-month"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  name="cardExpiryYear"
                  label="Ano de validade"
                  type="number"
                  id="cardExpiryYear"
                  autoComplete="cc-exp-year"
                />
              </Grid>
            </Grid>
            <TextField
              margin="normal"
              required
              fullWidth
              name="cardCVV"
              label="CVV"
              type="number"
              id="cardCVV"
              autoComplete="cc-csc"
            />
            <FormControlLabel
              control={<Checkbox value="agree" color="primary" name="termsAccepted" />}
              label="Li e aceito os *Termos para o agendamento"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Confirmar agendamento
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default dynamic(() => Promise.resolve(Checkout), { ssr: false });
