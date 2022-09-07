import style from './Card.module.css';
import clsx from 'clsx';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useContext, useState } from 'react';
import uniqid from 'uniqid';
import { contextUser } from '../../../App';
import axios from 'axios';
import Button from '../../../components/Button';

function CardBlock({ item, noGrid }) {
    const context = useContext(contextUser);
    const { favorites, setFavorites, user, setNotifications } = context;
    let navigate = useNavigate();
    const handleClickDetailPage = () => {
        navigate('/shop/' + item._id);
    };
    const handleFavorite = () => {
        if (user) {
            const isAdded = favorites.find((favorite) => item._id === favorite._id);
            if (!isAdded) {
                setFavorites((pre) => [...pre, item]);
                axios
                    .post(`${process.env.REACT_APP_API_KEY}/favorite/add`, {
                        user_id: typeof user === 'string' ? user : user.user_id,
                        item_id: item._id,
                    })
                    .then((response) => {
                        setNotifications((pre) => [
                            ...pre,
                            {
                                id: uniqid(),
                                description: 'Add item into favorites successfully',
                                type: 'success',
                            },
                        ]);
                        console.log(response);
                    })
                    .catch((error) => console.log(error));
            } else {
                setNotifications((pre) => [
                    ...pre,
                    {
                        id: uniqid(),
                        description: 'This item was added in favorites',
                        type: 'danger',
                    },
                ]);
            }
        } else {
            alert('You must Login');
            navigate('/login');
        }
    };
    return (
        <div className={clsx(noGrid ? style.noGrid : 'col l-3 m-4 c-6', style.card)}>
            <Card className={style.cardBlock}>
                <CardMedia
                    component="img"
                    alt="green iguana"
                    height="270"
                    image={item.image}
                    onClick={() => handleClickDetailPage()}
                />
                <CardContent sx={{ padding: '12px' }}>
                    <Typography gutterBottom variant="p" component="div" sx={{ fontSize: '1.1rem' }}>
                        {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" fontSize="0.9rem">
                        price: <span style={{ color: '#cc0000' }}>{item.price}</span> won
                    </Typography>
                </CardContent>
                <CardActions
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        padding: '4px',
                    }}
                >
                    <Button secondary onClick={() => handleClickDetailPage()}>
                        Buy
                    </Button>
                    <Button secondary small onClick={() => handleFavorite()} style={{ padding: 0, minWidth: '80px' }}>
                        <FavoriteIcon />
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
}

export default CardBlock;
