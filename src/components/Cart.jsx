import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useTheme } from '@mui/material/styles';

const drawerWidth = 350;

function Cart({ open, onClose }) {
    const theme = useTheme();

    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    backgroundColor: '#2E7D32', // cor de fundo verde
                    color: '#D9D9D9',
                    height: '100vh', // ocupar toda a altura da tela
                },
            }}
            variant="persistent"
            anchor="right"
            open={open}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: theme.spacing(0, 1),
                    ...theme.mixins.toolbar,
                    justifyContent: 'center', // centralizar conteúdo
                    color: '#FFFFFF', // cor do texto branca
                }}
            >
                <IconButton sx={{ color: 'inherit', fontSize: '1.2rem' }} >
                    <ShoppingCartIcon sx={{ fontSize: '1.5rem' }} /> {/* ícone menor */}
                    Meu carrinho
                </IconButton>
            </Box>
            <Divider />
            <Box
                role="presentation"
                onClick={onClose}
                onKeyDown={onClose}
                sx={{ width: '100%', height: '100%' }}
            >
                <List>
                    {['Exame 1', 'Exame 2', 'Exame 3', 'Exame 4', 'Exame 5', 'Exame 6', 'Exame 7', 'Exame 8', 'Exame 9', 'Exame 10'].map((text, index) => (
                        <ListItem key={text}>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {['Total: R$XXX'].map((text, index) => (
                        <ListItem key={text}>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Drawer>
    );
}

export default Cart;
