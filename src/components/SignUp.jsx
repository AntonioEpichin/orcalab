'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
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
      main: '#418041',  // Cor principal verde escuro
      light: 'rgba(65, 128, 65, 0.8)',  // Verde claro para efeitos de hover
    }
  }
});

function SignUp() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      nome: data.get('nome'),
      dataNascimento: data.get('dataNascimento'),
      cpf: data.get('cpf'),
      password: data.get('password'),
      confirmPassword: data.get('confirmPassword'),
      telefone: data.get('telefone'),
      email: data.get('email'),
      terms: data.get('terms'),
    });
    console.log(defaultTheme);
  };

  return (
    <ThemeProvider theme={defaultTheme} >
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#418041' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Criar Conta
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="nome"
                  label="Nome"
                  name="nome"
                  autoComplete="name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="dataNascimento"
                  label="Data de nascimento"
                  name="dataNascimento"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="cpf"
                  label="CPF"
                  name="cpf"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Senha"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirmação de senha"
                  type="password"
                  id="confirmPassword"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="telefone"
                  label="Telefone"
                  name="telefone"
                  type="tel"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  label="E-mail"
                  name="email"
                  type="email"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="acceptTerms" color="primary" name="terms" />}
                  label="Li e aceito os *Termos de Uso"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2}}
            >
             Continuar
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
              <span>Já tem uma conta? </span> <Link href="/login" variant="body2">
                Entrar
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default dynamic(() => Promise.resolve(SignUp), { ssr: false })
