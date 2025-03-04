import './App.css';
import { Outlet } from "react-router";
import NavBar from './components/NavBar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CartCountContext } from './contexts/CartCountContext'
import { useState } from 'react';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ff5252',
    },
    background: {
      paper: '#130e0e',
    }
  },
});

function App() {
  const [cartCount, setCartCount] = useState(0);

  const pages = [
    {
      title: 'Home',
      src: '/'
    },
    {
      title: 'Cart',
      src: '/cart'
    }
  ];

  return (
    <ThemeProvider theme={darkTheme}>
    <CssBaseline />
      <CartCountContext.Provider value={{cartCount, setCartCount}}>
        <NavBar pages={pages}></NavBar>
        <Outlet />
      </CartCountContext.Provider>
    </ThemeProvider>
  )
}

export default App
