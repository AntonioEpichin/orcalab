'use client';

import React from 'react';
import { Grid, Typography, Paper } from '@mui/material';

export default function Footer() {
  return (
    <Paper
      component="footer"
      square
      variant="outlined"
      sx={{
        backgroundColor: '#e0e0e0', // A cor do fundo cinza
        padding: { xs: 3, sm: 6 }, // Ajuste do padding para telas menores e maiores
        marginTop: 4, // Margin top usando unidades do tema
        color: '#757575', // A cor do texto
        '& .MuiTypography-root': { // Aplicando estilos a todos os Typography dentro deste Paper
          paddingBottom: 1 // Espaçamento na parte inferior de cada Typography
        }
      }}
    >
      <Grid container spacing={4} justifyContent="space-around">
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="subtitle1" color="inherit">
            INFORMAÇÕES GERAIS
          </Typography>
          <Typography variant="body2" color="inherit">
            Aqui vai o texto ou links para informações gerais.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="subtitle1" color="inherit">
            FORMAS DE PAGAMENTO
          </Typography>
          <Typography variant="body2" color="inherit">
            Detalhes das formas de pagamento aceitas.
          </Typography>
        </Grid>
        {/* Pode adicionar mais Grid items aqui para mais conteúdo */}
      </Grid>
    </Paper>
  );
}
