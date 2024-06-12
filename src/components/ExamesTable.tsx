// component/ExamesTable.tsx

'use client'

import React, { useState, useEffect } from 'react';
import { Avatar, Paper, Typography, IconButton, Box, Container, List, ListItem, ListItemText, ListItemSecondaryAction } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Pagination } from '@mui/material';
import { useCart } from '../context/CartContext';
import { useSearch } from '../context/SearchContext';
import { useJsonFile } from '../context/JsonFileContext';
import InputBase from '@mui/material/InputBase';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#006A39',
      light: 'rgba(65, 128, 65, 0.8)',
    }
  }
});

const drawerWidth = 30;

const Item = ({ exame, onAdd }) => {
  const formattedPrice = parseFloat(exame.preço).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <ListItem divider>
      <ListItemText
        primary={exame.nome}
      />
      <ListItemSecondaryAction>
        <Box display="flex" alignItems="center" justifyContent="space-between" width="200px">
          <Typography variant="body1" sx={{ textAlign: 'center', flex: 1 }}>
            {exame.código}
          </Typography>
          <Typography variant="body1" sx={{ textAlign: 'right', flex: 1 }}>
            {formattedPrice}
          </Typography>
          <IconButton edge="end" aria-label="add" onClick={() => onAdd(exame)}>
            <AddCircleIcon sx={{ color: 'primary.main' }} />
          </IconButton>
        </Box>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

const searchInputStyles = (theme) => ({
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
  '& .MuiInputBase-input': {
    color: theme.palette.text.primary,
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
});

export default function ExamesTable() {
  const [exames, setExames] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;
  const { addItemToCart, isCartOpen } = useCart();
  const { searchTerm, setSearchTerm } = useSearch();
  const { selectedFile } = useJsonFile();
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    fetch(`/${selectedFile}`)
      .then(response => response.json())
      .then(data => setExames(data))
      .catch(error => console.error('Error fetching exams data:', error));
  }, [selectedFile]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleAddToCart = async (exame) => {
    if (status === 'loading') return;

    if (!session) {
      alert('Você precisa estar logado para adicionar exames ao carrinho.');
      router.push(`/login?callbackUrl=${encodeURIComponent(window.location.pathname)}`);
      return;
    }

    addItemToCart({
      id: exame.id,
      nome: exame.nome,
      código: exame.código,
      preço: exame.preço
    });
  };

  const filteredExames = exames.filter(exame =>
    exame.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const count = Math.ceil(filteredExames.length / itemsPerPage);
  const paginatedExames = filteredExames.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth={false} sx={{ padding: 0 }}>
        <Paper sx={{
          padding: 2,
          borderRadius: '10px',
          backgroundColor: '#e0e0e0',
          width: `calc(100% - ${isCartOpen ? drawerWidth : 0}px)`,
          transition: 'width 0.3s',
          marginRight: isCartOpen ? `${drawerWidth}px` : 0
        }}>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            pl: 2,
            mb: 2,
            backgroundColor: 'primary.main',
            borderRadius: '10px'
          }}>
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <MonitorHeartIcon fontSize='large' />
            </Avatar>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#fff' }}>
              Exames
            </Typography>
            <Box sx={searchInputStyles(defaultTheme)}>
              <InputBase
                placeholder="Pesquise por Exame"
                inputProps={{ 'aria-label': 'search' }}
                onChange={handleSearchChange}
                sx={{ color: defaultTheme.palette.text.primary }}
              />
            </Box>
          </Box>
          <List>
            {paginatedExames.map((exame: any) => (
              <Item key={exame.id} exame={exame} onAdd={handleAddToCart} />
            ))}
          </List>
          <Pagination count={count} page={page} onChange={handleChangePage} sx={{ mt: 2, display: 'flex', justifyContent: 'center' }} />
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
