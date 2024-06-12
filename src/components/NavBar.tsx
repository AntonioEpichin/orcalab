// components/NavBar.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
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

const CustomAppBar = styled(AppBar)(({ theme }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

const CustomAutocomplete = styled(Autocomplete)(({ theme }) => ({
  '& .MuiAutocomplete-inputRoot': {
    fontWeight: 'bold',
    padding: '1px 2px',
    color: 'gray',
  },
  '& .MuiAutocomplete-input': {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}));

type TableOption = {
  label: string;
  value: string;
};

export default function NavBar() {
  const theme = useTheme();
  const { isCartOpen, toggleCart, cartItems, clearCart } = useCart();
  const { selectedFile, setSelectedFile } = useJsonFile();
  const [inputValue, setInputValue] = useState('');
  const [tableOptions, setTableOptions] = useState<TableOption[]>([]);

  useEffect(() => {
    const fetchTableOptions = async () => {
      try {
        const response = await fetch('/api/tables');
        const data: TableOption[] = await response.json();
        setTableOptions(data);
      } catch (error) {
        console.error('Failed to fetch table options', error);
      }
    };

    fetchTableOptions();
  }, []);

  const handleFileChange = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: TableOption | null
  ) => {
    if (newValue) {
      setSelectedFile(newValue.value);
      clearCart();
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <CustomAppBar
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
              minWidth: '361px',
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
                  placeholder="Selecione uma tabela"
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
                maxWidth: '361px',
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
      </CustomAppBar>
    </Box>
  );
}
