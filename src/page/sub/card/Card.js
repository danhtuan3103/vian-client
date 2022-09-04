import style from './Card.module.css';
import clsx from 'clsx';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { useContext } from 'react';
import { contextUser } from '../../../App';
import axios from 'axios';

const CustomizedButton = styled(Button)`
    color: var(--green);
    border-color: var(--green);
    width: 100px;
    cursor: pointer;

    :hover {
        color: var(--color-accent);
        border-color: var(--color-accent);
        background-color: rgb(237, 227, 227, 0);
    }
`;

function CardBlock({ item, noGrid }) {
    const context = useContext(contextUser);
    const { favorites, setFavorites, user } = context;
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
                    .then((response) => console.log(response))
                    .catch((error) => console.log(error));
            } else {
                alert('Favorite added ');
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
                <CardContent>
                    <Typography gutterBottom variant="p" component="div" sx={{ fontSize: '1.2rem' }}>
                        {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" fontSize="1rem">
                        price: <span style={{ color: '#cc0000' }}>{item.price}</span> won
                    </Typography>
                </CardContent>
                <CardActions
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <CustomizedButton onClick={() => handleClickDetailPage()} size="small">
                        Buy
                    </CustomizedButton>
                    <CustomizedButton size="small" className={style.FavoriteButton} onClick={() => handleFavorite()}>
                        <FavoriteIcon className={style.FavoriteIcon} />
                    </CustomizedButton>
                </CardActions>
            </Card>
        </div>
    );
}

export default CardBlock;
