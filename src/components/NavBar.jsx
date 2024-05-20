'use client';

import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useCart } from '@/components/CartContext';

const drawerWidth = 350;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  }),
}));

export default function NavBar() {
  const theme = useTheme();
  const { isCartOpen, toggleCart } = useCart();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" open={isCartOpen} sx={{ backgroundColor: theme.palette.success.main }}>
        <Toolbar sx={{ justifyContent: 'flex-end' }}>
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
          <IconButton
            size="large"
            aria-label="carrinho de compras"
            color="inherit"
            onClick={toggleCart}
          >
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
