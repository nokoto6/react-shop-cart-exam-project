import ProductCard from "../components/ProductCard";
import { Box } from "@mui/material";
import axios from "axios";
import { useLocalStorage } from "react-use";
import { useEffectOnce } from "react-use";
import Typography from '@mui/material/Typography';
import { useContext, useState } from 'react';
import { CartCountContext } from '../contexts/CartCountContext';
import Snackbar from '@mui/material/Snackbar';

function Home() {
    const [products, setProducts] = useLocalStorage('products', []);
    const [cart, setCart] = useLocalStorage('cart', {});
    const {setCartCount} = useContext(CartCountContext);
    const [hint, setHint] = useState(false);

    const addCartId = (id) => { 
        cart[id] = typeof cart[id] == 'number' ? Math.min(cart[id] + 1, 10) : 1
        setCart(cart);
        setCartCount(Object.keys(cart).length);
        setHint(true);
    }

    const hintClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setHint(false);
    };

    const getApiData = async () => {
        const response = await axios(
            'https://dummyjson.com/products/search?q=food'
        ).then((response) => {
            setProducts(response.data.products);
        })
    };

    useEffectOnce(() => {
        if(!products.length) { getApiData() }
    })

    return (
        <>
            <Typography gutterBottom variant="h4" component="div" sx={{textAlign: 'center', mt: 4, mb: 4}}>
                Product catalog
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    alignContent: 'stretch',
                    p: 1,
                    m: 1,
                    bgcolor: 'background.paper',
                    borderRadius: 1,
                    gap: 1
                }}
            >
                {products.map(item => {
                    return(
                        <ProductCard count={cart[item.id]} handleEventAdd={(id) => addCartId(id)} key={item.id} {...item}></ProductCard>
                    )
                })}
            </Box>
            <Snackbar
                open={hint}
                autoHideDuration={1000}
                onClose={hintClose}
                message="Товар добавлен в корзину"
            />
        </>
    )
}

export default Home