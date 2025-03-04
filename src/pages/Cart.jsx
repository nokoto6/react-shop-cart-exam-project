import { Box } from "@mui/material";
import { useLocalStorage } from "react-use";
import Typography from '@mui/material/Typography';
import { useContext, useEffect, useState } from 'react';
import { CartCountContext } from '../contexts/CartCountContext';
import CartCard from "../components/CartCard";

function Cart() {
    const [products, setProducts] = useLocalStorage('products', []);
    const [cart, setCart] = useLocalStorage('cart', {});
    const {setCartCount} = useContext(CartCountContext);

    const [cartList, setCartList] = useState([]);

    const removeCartId = (id) => { 
        if(cart[id]) {
            delete cart[id]
            setCart(cart);
            setCartCount(Object.keys(cart).length);
        }
    }

    const setCartCardCount = (id, count) => {
        cart[id] = count
        setCart(cart)
    }

    useEffect(() => {
        const arr = [];
        setCartList(products.filter(item => {
            return typeof cart[item.id] == 'number'
        }))
    }, [cart])

    return (
        <>
            <Typography gutterBottom variant="h4" component="div" sx={{textAlign: 'center', mt: 4, mb: 4}}>
                Product cart
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
                {cartList.map(item => <CartCard count={cart[item.id]} handleEventSetCount={(id, count) => setCartCardCount(id, count)} handleEventRemove={(id) => removeCartId(id)} key={item.id} {...item}></CartCard>)}
            </Box>
        </>
    )
}

export default Cart