'use client'

import React, { useState, useEffect } from 'react';
import { Avatar, Grid, Paper, Typography, IconButton, Box, Container } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Pagination } from '@mui/material';
import { useCart } from '@/components/CartContext';

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#418041',
      light: 'rgba(65, 128, 65, 0.8)',
    }
  }
});

const Item = ({ exame, onAdd }) => {
  const formattedPrice = parseFloat(exame.preço).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Paper elevation={2} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, borderRadius: '10px' }}>
        <Typography variant="body1">{exame.nome}</Typography>
        <Box display="flex" alignItems="center">
          <Typography variant="body1" sx={{ minWidth: '80px' }}>{formattedPrice}</Typography>
          <IconButton aria-label="adicionar exame" onClick={() => onAdd(exame)}>
            <AddCircleIcon sx={{ color: 'primary.main' }} />
          </IconButton>
        </Box>
      </Paper>
    </Grid>
  );
};

export default function ExamesTable() {
  const [exames, setExames] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const { addItemToCart } = useCart();

  useEffect(() => {
    fetch('/exames.json')
      .then(response => response.json())
      .then(data => setExames(data))
      .catch(error => console.error('Error fetching exams data:', error));
  }, []);

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
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#fff' }}>
              Exames
            </Typography>
          </Box>
          <Grid container spacing={2}>
            {paginatedExames.map((exame) => (
              <Item key={exame.id} exame={exame} onAdd={addItemToCart} />
            ))}
          </Grid>
          <Pagination count={count} page={page} onChange={handleChangePage} sx={{ mt: 2, justifyContent: 'center' }} />
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
