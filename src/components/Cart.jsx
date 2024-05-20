// components/Cart.js
import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import { useCart } from '@/components/CartContext';

const drawerWidth = 350;

function Cart() {
  const theme = useTheme();
  const { cartItems, total, removeItemFromCart, clearCart, isCartOpen, toggleCart } = useCart();

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          backgroundColor: theme.palette.success.main,
          color: '#D9D9D9',
          height: '100vh',
          position: 'fixed',
        },
      }}
      variant="persistent"
      anchor="right"
      open={isCartOpen}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: theme.spacing(0, 1),
          ...theme.mixins.toolbar,
          justifyContent: 'center',
          color: '#FFFFFF',
        }}
      >
        <IconButton sx={{ color: 'inherit', fontSize: '1.2rem' }} onClick={toggleCart}>
          <ShoppingCartIcon sx={{ fontSize: '1.5rem' }} />
          Meu carrinho
        </IconButton>
      </Box>
      <Divider />
      <Box
        role="presentation"
        sx={{ width: '100%', height: 'calc(100% - 150px)', overflowY: 'auto' }}
      >
        <List>
          {cartItems.map((item, index) => (
            <ListItem key={index} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <ListItemText primary={`${item.nome} - ${parseFloat(item.preço).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`} />
              <IconButton edge="end" aria-label="delete" onClick={() => removeItemFromCart(item)}>
                <DeleteIcon sx={{ color: 'red' }} />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Box>
      <Divider />
      <Box sx={{ padding: 2 }}>
        <Typography variant="h6" sx={{ textAlign: 'center', fontWeight: 'bold', color: '#FFFFFF' }}>
          Total: {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
          <Button variant="contained" color="secondary" sx={{ mb: 1, width: '100%' }} onClick={() => alert('Compra finalizada!')}>
            Finalizar compra
          </Button>
          <Button variant="contained" color="error" sx={{ width: '100%' }} onClick={clearCart}>
            Limpar carrinho
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}

export default Cart;
