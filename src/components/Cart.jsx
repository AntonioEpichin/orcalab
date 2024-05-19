import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
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
                    justifyContent: 'flex-start',
                }}
            >
                <IconButton onClick={onClose}>
                    {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
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
                    {['Exame 1', 'Exame 2', 'Exame 3'].map((text, index) => (
                        <ListItem  key={text}>
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
