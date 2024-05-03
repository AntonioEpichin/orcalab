'use client';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useTheme } from '@mui/material/styles';

export default function Header() {
  const theme = useTheme();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: theme.palette.success.main }}>
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
            {/* Aqui iria o logotipo e outros elementos que desejar */}
          </Box>
          <Box sx={{
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: theme.palette.common.white,
            marginRight: theme.spacing(2),
            marginLeft: 0,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
              marginLeft: theme.spacing(3),
              width: 'auto',
            },
          }}>
            <InputBase
              sx={{
                color: theme.palette.text.primary,
                '& .MuiInputBase-input': {
                  padding: theme.spacing(1, 1, 1, 0),
                  paddingLeft: `calc(1em + ${theme.spacing(4)})`,
                  transition: theme.transitions.create('width'),
                  width: '100%',
                  [theme.breakpoints.up('md')]: {
                    width: '20ch',
                  },
                },
              }}
              placeholder="Pesquise por Exame"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Box>
          <IconButton size="large" aria-label="carrinho de compras" color="inherit">
            <ShoppingCartIcon />
          </IconButton>
          <IconButton
            size="large"
            edge="end"
            aria-label="conta do usuário"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
