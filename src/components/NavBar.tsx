'use client';

import React, { useState, SyntheticEvent } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Badge from '@mui/material/Badge';
import Link from 'next/link';
import { SvgIcon, Paper, TextField, Autocomplete, AutocompleteRenderInputParams } from '@mui/material';
import { useCart } from '../context/CartContext';
import { useJsonFile } from '../context/JsonFileContext';

const drawerWidth = 350;

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

const CustomAutocomplete = styled(Autocomplete)(({ theme }) => ({
  '& .MuiAutocomplete-inputRoot': {
    fontWeight: 'bold',  // Make the selected item bold
    padding: '2px 4px',  // Adjust padding for smaller size
    color: 'gray',  // Change text color
  },
  '& .MuiAutocomplete-input': {
    whiteSpace: 'nowrap',  // Prevent text from wrapping
    overflow: 'hidden',  // Hide overflow text
    textOverflow: 'ellipsis',  // Display ellipsis for overflow text
  },
}));

type TableOption = {
  label: string;
  value: string;
};

const tableOptions: TableOption[] = [
  { label: 'PARTICULAR CREMASCO', value: 'tabelas/balcão/PARTICULAR CREMASCO.json' },
  { label: 'INTERMEDICINA', value: 'tabelas/balcão/INTERMEDICINA.json' },
  { label: 'PRECOS ESPECIAIS CREMASCO', value: 'tabelas/balcão/PRECOS ESPECIAIS CREMASCO.json' },
  { label: 'MDG BENEFICIOS', value: 'tabelas/balcão/MDG BENEFICIOS.json' },
  { label: 'YOU SAUDE - ANALISES CLINICAS', value: 'tabelas/faturado/YOU SAUDE - ANALISES CLINICAS.json' },
  // Add more table options as needed
];

export default function NavBar() {
  const theme = useTheme();
  const { isCartOpen, toggleCart, cartItems, clearCart } = useCart();
  const { selectedFile, setSelectedFile } = useJsonFile();
  const [inputValue, setInputValue] = useState('');

  const handleFileChange = (
    event: SyntheticEvent<Element, Event>,
    newValue: TableOption | null
  ) => {
    if (newValue) {
      setSelectedFile(newValue.value);
      clearCart(); // Clear the cart when a new file is selected
    }
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
              minWidth: '361px',  // Adjust minimum width for more space
            }}
          >
            <CustomAutocomplete
              value={tableOptions.find(option => option.value === selectedFile) || null}
              onChange={handleFileChange}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
              options={tableOptions}
              getOptionLabel={(option: TableOption) => option.label}
              renderInput={(params: AutocompleteRenderInputParams) => (
                <TextField
                  {...params}
                  placeholder="Select a table"
                  sx={{
                    '& .MuiOutlinedInput-input': {
                      padding: theme.spacing(0.5, 1),
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      border: 'none',
                    },
                  }}
                />
              )}
              sx={{
                width: '100%',
                maxWidth: '361px',  // Adjust maximum width for more space
                color: 'gray',
                '& .MuiAutocomplete-option': {
                  display: 'block',
                },
              }}
            />
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
