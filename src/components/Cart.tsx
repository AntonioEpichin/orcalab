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
import { useCart } from '../context/CartContext';
import { useRouter } from 'next/navigation';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { saveAs } from 'file-saver';

interface CartItem {
  id: string;
  nome: string;
  código: string;
  preço: number;
}

interface Orientation {
  nome: string;
  orientacao: string;
}

const drawerWidth = 350;

const Cart = () => {
  const theme = useTheme();
  const { cartItems, removeItemFromCart, clearCart, isCartOpen, toggleCart } = useCart();
  const router = useRouter();

  const handleCheckout = () => {
    generatePDF();
  };

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.preço, 0);
  };

  const fetchOrientations = async (): Promise<Orientation[]> => {
    const response = await fetch('tabelas/orientations.json');
    const data = await response.json();
    return data;
  };

  const generatePDF = async () => {
    try {
      const existingPdfBytes = await fetch('/Timbrado.pdf').then(res => res.arrayBuffer());
      const templatePdfDoc = await PDFDocument.load(existingPdfBytes);
      const helveticaFont = await templatePdfDoc.embedFont(StandardFonts.Helvetica);
      const [templatePage] = templatePdfDoc.getPages();
      const templatePageWidth = templatePage.getWidth();
      const templatePageHeight = templatePage.getHeight();
  
      const leftMargin = 50;
      const rightMargin = templatePageWidth - 50;
      const topMargin = 150;
      const bottomMargin = 100;
      const lineHeight = 15;
      const orientationLineHeight = 10;
      const chunkSize = 100; // Number of items to process in one go
  
      let newPdfDoc = await PDFDocument.create();
      let embeddedPage = await newPdfDoc.embedPage(templatePage);
      let yOffset = templatePageHeight - topMargin;
  
      const addNewPageWithTemplate = () => {
        const newPage = newPdfDoc.addPage([templatePageWidth, templatePageHeight]);
        newPage.drawPage(embeddedPage);
        yOffset = templatePageHeight - topMargin;
        return newPage;
      };
  
      const wrapText = (text, font, fontSize, maxWidth) => {
        const words = text.split(' ');
        let lines = [];
        let currentLine = words[0];
  
        for (let i = 1; i < words.length; i++) {
          const word = words[i];
          const width = font.widthOfTextAtSize(currentLine + ' ' + word, fontSize);
          if (width < maxWidth) {
            currentLine += ' ' + word;
          } else {
            lines.push(currentLine);
            currentLine = word;
          }
        }
        lines.push(currentLine);
        return lines;
      };
  
      const drawTextWithWrapping = (page, text, x, initialY, font, fontSize, maxWidth, lineHeight) => {
        const lines = wrapText(text, font, fontSize, maxWidth);
        let y = initialY;
        for (const line of lines) {
          if (y < bottomMargin + lineHeight) {
            page = addNewPageWithTemplate();
            y = templatePageHeight - topMargin;
          }
          page.drawText(line, { x, y, size: fontSize, font, color: rgb(0, 0, 0) });
          y -= lineHeight;
        }
        return y;
      };
  
      let page = addNewPageWithTemplate();
      const orientations = await fetchOrientations();
  
      for (let i = 0; i < cartItems.length; i += chunkSize) {
        const chunk = cartItems.slice(i, i + chunkSize);
  
        for (const item of chunk) {
          const itemOrientations = orientations.filter(orientation => orientation.nome === item.nome);
  
          let requiredHeight = lineHeight + 30; // Initial height for item name, code, and price
          for (const orientation of itemOrientations) {
            const orientationLines = wrapText(orientation.orientacao, helveticaFont, orientationLineHeight, rightMargin - leftMargin);
            requiredHeight += orientationLines.length * orientationLineHeight;
          }
  
          if (yOffset < requiredHeight + bottomMargin) {
            page = addNewPageWithTemplate();
          }
  
          page.drawText(`${item.nome} (cód: ${item.código}) - ${item.preço.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`, {
            x: leftMargin,
            y: yOffset,
            size: 12,
            font: helveticaFont,
            color: rgb(0, 0, 0),
            maxWidth: rightMargin - leftMargin,
          });
          yOffset -= 20;
  
          for (const orientation of itemOrientations) {
            yOffset = drawTextWithWrapping(page, orientation.orientacao, leftMargin, yOffset, helveticaFont, orientationLineHeight, rightMargin - leftMargin, orientationLineHeight);
          }
          yOffset -= 10;
        }
  
        // Save the current state and start a new PDF document to free memory
        const pdfBytes = await newPdfDoc.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        saveAs(blob, `orcamento_part${Math.floor(i / chunkSize) + 1}.pdf`);
  
        // Reinitialize for the next chunk
        newPdfDoc = await PDFDocument.create();
        embeddedPage = await newPdfDoc.embedPage(templatePage);
        yOffset = templatePageHeight - topMargin;
        page = addNewPageWithTemplate();
      }
  
      // Final save
      const finalPdfBytes = await newPdfDoc.save();
      const finalBlob = new Blob([finalPdfBytes], { type: 'application/pdf' });
      saveAs(finalBlob, 'orcamento_final.pdf');
  
      clearCart();
      toggleCart();
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };
  
  
  // Utility function to wrap text
  const wrapText = (text, font, fontSize, maxWidth) => {
    const words = text.split(' ');
    let lines = [];
    let currentLine = words[0];
  
    for (let i = 1; i < words.length; i++) {
      const word = words[i];
      const width = font.widthOfTextAtSize(currentLine + ' ' + word, fontSize);
      if (width < maxWidth) {
        currentLine += ' ' + word;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }
    lines.push(currentLine);
    return lines;
  };
  
  
  
  

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          backgroundColor: '#006A39',
          color: '#FFFFFF',
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
              <ListItemText 
                primaryTypographyProps={{ color: '#FFFFFF', variant: 'body2' }}
                primary={`${item.nome} (cód: ${item.código}) - ${item.preço.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`} 
              />
              <IconButton edge="end" aria-label="delete" onClick={() => removeItemFromCart(item)} size="small">
                <DeleteIcon sx={{ color: 'red', fontSize: '1rem' }} />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Box>
      <Divider />
      <Box sx={{ padding: 2 }}>
        <Typography variant="h6" sx={{ textAlign: 'center', fontWeight: 'bold', color: '#FFFFFF' }}>
          Total: {calculateTotal().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
          <Button variant="contained" color="secondary" sx={{ mb: 1, width: '100%' }} onClick={handleCheckout}>
            Finalizar orçamento
          </Button>
          <Button variant="contained" color="error" sx={{ width: '100%' }} onClick={clearCart}>
            Limpar carrinho
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Cart;
