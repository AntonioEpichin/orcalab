'use client'

import React, { useState } from 'react';
import { Avatar, Grid, Paper, Typography, IconButton, Box, Container  } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AssessmentIcon from '@mui/icons-material/Assessment';  // Ícone de exames
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import { Pagination } from '@mui/material'


const exames = [
  { id: 1, nome: 'Exame 01', preco: 'R$ 00,00' },
  { id: 2, nome: 'Exame 02', preco: 'R$ 00,00' },
  { id: 3, nome: 'Exame 03', preco: 'R$ 00,00' },
  { id: 4, nome: 'Exame 04', preco: 'R$ 00,00' },
  { id: 5, nome: 'Exame 05', preco: 'R$ 00,00' },
  { id: 6, nome: 'Exame 06', preco: 'R$ 00,00' },
  { id: 7, nome: 'Exame 07', preco: 'R$ 00,00' },
  { id: 8, nome: 'Exame 08', preco: 'R$ 00,00' },
  { id: 9, nome: 'Exame 09', preco: 'R$ 00,00' },
  { id: 10, nome: 'Exame 10', preco: 'R$ 00,00' },
  { id: 11, nome: 'Exame 11', preco: 'R$ 00,00' },
  { id: 12, nome: 'Exame 12', preco: 'R$ 00,00' },
  { id: 13, nome: 'Exame 13', preco: 'R$ 00,00' },
  { id: 14, nome: 'Exame 14', preco: 'R$ 00,00' },
  { id: 15, nome: 'Exame 15', preco: 'R$ 00,00' },
  { id: 16, nome: 'Exame 16', preco: 'R$ 00,00' },
  { id: 17, nome: 'Exame 17', preco: 'R$ 00,00' },
  { id: 18, nome: 'Exame 18', preco: 'R$ 00,00' },
  { id: 19, nome: 'Exame 19', preco: 'R$ 00,00' },
  { id: 20, nome: 'Exame 20', preco: 'R$ 00,00' },
  // ... outros exames
];

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#418041',  // Cor principal verde escuro
      light: 'rgba(65, 128, 65, 0.8)',  // Verde claro para efeitos de hover
    }
  }
});

const Item = ({ nome, preco }) => (
  <Grid item xs={6} sm={4} md={3}>
    <Paper elevation={2} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, borderRadius: '10px' }}>
      <Typography variant="body1">{nome}</Typography>
      <Box display="flex" alignItems="center">
        <Typography variant="body1" sx={{ minWidth: '80px' }}>{preco}</Typography>
        <IconButton aria-label="adicionar exame">
          <AddCircleIcon sx={{ color: 'primary.main' }} />
        </IconButton>
      </Box>
    </Paper>
  </Grid>
);

export default function ExamesTable() {
  const [page, setPage] = useState(1);
  const itemsPerPage = 10; // Número de itens por página

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const count = Math.ceil(exames.length / itemsPerPage);
  const paginatedExames = exames.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main">
        <Paper sx={{ padding: 2, borderRadius: '10px', backgroundColor: '#e0e0e0' }} elevation={0}>
          <Box sx={{ display: 'flex', alignItems: 'center', pl: 2, mb: 2, backgroundColor: 'primary.main', borderRadius: '10px' }}>
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <MonitorHeartIcon fontSize='large' />
            </Avatar>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#fff',  }}>
              Exames
            </Typography>
          </Box>
          <Grid container spacing={2}>
            {paginatedExames.map((exame) => (
              <Grid item xs={12} sm={6} md={4} key={exame.id}>
                <Paper elevation={2} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, borderRadius: '10px' }}>
                  <Typography variant="body1">{exame.nome}</Typography>
                  <Box display="flex" alignItems="center">
                    <Typography variant="body1" sx={{ minWidth: '80px' }}>{exame.preco}</Typography>
                    <IconButton aria-label="adicionar exame">
                      <AddCircleIcon sx={{ color: 'primary.main' }} />
                    </IconButton>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
          <Pagination count={count} page={page} onChange={handleChangePage} sx={{ mt: 2, justifyContent: 'center' }} />
        </Paper>
      </Container>
    </ThemeProvider>
  );
}



