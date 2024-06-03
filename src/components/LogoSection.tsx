'use client'

import React from 'react';
import { Box, Typography, IconButton, Link, ThemeProvider, createTheme } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';

// Criação do tema personalizado
const theme = createTheme({
    palette: {
        text: {
            primary: '#706e6f' // Define a cor para textos e ícones
        }
    },
    components: {
        MuiTypography: {
            styleOverrides: {
                root: {
                    color: '#706e6f' // Aplica a cor a todos os textos
                }
            }
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    color: '#706e6f' // Aplica a cor a todos os ícones
                }
            }
        }
    }
});

const LogoSection = () => {
    const mapUrl = "https://www.google.com/maps/place/Seu+Endereço";
    const whatsappUrl = "https://wa.me/+5511912345678?text=Olá!%20Gostaria%20de%20mais%20informações.";

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-start',
                justifyContent: 'normal',
                paddingY: 1,
                backgroundColor: 'white',
                marginTop: 10,
                marginLeft: 5,
            }}>

                <Box component="img"
                    src="/images/logo-2.png"
                    alt="Logomarca"
                    sx={{
                        borderRadius: '50%',
                        width: 120,
                        height: 120,
                        objectFit: 'cover',
                        marginBottom: 1,

                    }}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: 2, marginTop: 2, }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                        <Link href= "/" sx={{ textDecoration: 'none', color: 'inherit' }}>    
                        Logomarca 
                        </Link>
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: '-moz-initial' }}>
                        <Link href={mapUrl} sx={{ textDecoration: 'none' }} target="_blank" color="inherit">
                            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
                                <IconButton aria-label="localização" sx={{ padding: 0, marginRight: 1 }}>
                                    <LocationOnIcon />
                                </IconButton>
                                <Typography variant="body2">
                                    endereço
                                </Typography>
                            </Box>
                        </Link>
                        <Link href={whatsappUrl} sx={{ textDecoration: 'none' }} target="_blank" color="inherit">
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <IconButton aria-label="telefone" sx={{ padding: 0, marginRight: 1 }}>
                                    <PhoneIcon />
                                </IconButton>
                                <Typography variant="body2">
                                    contato
                                </Typography>
                            </Box>
                        </Link>
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default LogoSection;
