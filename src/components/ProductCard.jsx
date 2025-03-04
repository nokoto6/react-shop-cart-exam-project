import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function ProductCard(props) {
    return (
        <Card className="Card" sx={{ 
            maxWidth: 345, 
            minWidth: 100,
            display: 'flex',
            flexDirection: 'column'
        }}>
            <CardMedia
                sx={{ height: 250, bgcolor: 'background.paper', backgroundSize:'auto' }}
                image={props.thumbnail}
                title={props.title}
            ></CardMedia>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {props.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {props.description}
                </Typography>
                <Typography variant="subtitle1" sx={{ mt: 1 }}>
                    {props.price}$
                </Typography>
                {props.count > 0 &&
                    <Typography variant="subtitle1" sx={{ mt: 2, color: 'coral' }}>
                        В корзине {props.count} шт.
                    </Typography>
                }
            </CardContent>
            <CardActions>
                <Button size="small" sx={{ mt: -2 }} onClick={() => props.handleEventAdd(props.id)}>add to cart</Button>
            </CardActions>
        </Card>
    )
}

export default ProductCard