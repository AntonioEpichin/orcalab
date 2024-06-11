'use client';

import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Badge from '@mui/material/Badge';
import Link from 'next/link';
import { SvgIcon, MenuItem, Select, Paper } from '@mui/material';
import { useCart } from '../context/CartContext';
import { useJsonFile } from '../context/JsonFileContext';

const drawerWidth = 350;

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

const CustomSelect = styled(Select)(({ theme }) => ({
  '& .MuiSelect-select': {
    fontWeight: 'bold',  // Make the selected item bold
  },
}));

export default function NavBar() {
  const theme = useTheme();
  const { isCartOpen, toggleCart, cartItems, clearCart } = useCart();
  const { selectedFile, setSelectedFile } = useJsonFile();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.value);
    clearCart(); // Clear the cart when a new file is selected
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: '#006A39',
          width: isCartOpen ? `calc(100% - ${drawerWidth}px)` : '100%',
          marginRight: isCartOpen ? `${drawerWidth}px` : 0,
          transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ flexGrow: 1 }} />
          <Paper
            elevation={0}
            sx={{
              display: 'flex',
              alignItems: 'center',
              padding: theme.spacing(0.5),
              borderRadius: theme.shape.borderRadius,
              backgroundColor: theme.palette.common.white,
              color: theme.palette.text.primary,
              boxShadow: 'none',
              border: 'none',
            }}
          >
            <CustomSelect
              value={selectedFile}
              onChange={handleFileChange}
              sx={{
                color: 'gray',
                '& .MuiOutlinedInput-input': {
                  padding: theme.spacing(0.5, 2),
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
              }}
            >
              <MenuItem value="exames.json">Particular</MenuItem>
              <MenuItem value="precosEspeciais.json">Preços Especiais</MenuItem>
            </CustomSelect>
          </Paper>
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
            <IconButton
              size="large"
              aria-label="carrinho de compras"
              color="inherit"
              onClick={toggleCart}
            >
              <Badge badgeContent={cartItems.length} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            <Link href="/login" passHref>
              <IconButton size="large" edge="end" aria-label="conta do usuário" aria-haspopup="true">
                <SvgIcon sx={{ color: "white" }}>
                  <AccountCircle />
                </SvgIcon>
              </IconButton>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
