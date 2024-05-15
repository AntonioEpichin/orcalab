import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

function Cart({ open, onClose }) {
    const list = () => (
        <div
          role="presentation"
          onClick={onClose}
          onKeyDown={onClose}
        >
            <List>
                {['Exame 1', 'Exame 2', 'Exame 3'].map((text, index) => (
                    <ListItem button key={text}>
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
        </div>
    );

    return (
        <Drawer anchor='right' open={open} onClose={onClose}>
            {list()}
        </Drawer>
    );
}

export default Cart;
