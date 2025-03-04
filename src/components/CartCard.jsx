import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import { useState } from 'react';

function CartCard(props) {
    const [stateCount, setStateCount] = useState(props.count)

    return (
        <Card className="Cart-Card" sx={{ 
            width: 225, 
            minWidth: 100,
            display: 'flex',
            flexDirection: 'column'
        }}>
            <CardMedia
                sx={{ height: 100, bgcolor: 'background.paper', backgroundSize:'contain' }}
                image={props.thumbnail}
                title={props.title}
            ></CardMedia>
            <CardContent>
                <Typography gutterBottom variant="h8" component="div">
                    {props.title}
                </Typography>
                <Typography variant="subtitle1" sx={{ mt: 1 }}>
                    {props.price}$
                </Typography>
                <Slider
                    sx={{
                        mt: 5
                    }}
                    aria-label="Small steps"
                    step={1}
                    marks
                    min={1}
                    max={10}
                    valueLabelDisplay="on"
                    value={stateCount}
                    onChange={(e) => { setStateCount(e.target.value); props.handleEventSetCount(props.id, e.target.value) }}
                />
                <Typography variant="subtitle1" sx={{ mt: 1 }}>
                    Full: {(props.price * stateCount).toFixed(2)}$
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={() => props.handleEventRemove(props.id)}>remove</Button>
            </CardActions>
        </Card>
    )
}

export default CartCard