import style from './Favorite.module.css';
import clsx from 'clsx';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { contextUser } from '../../../App';

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

const DeleteButton = styled(Button)`
    color: rgb(255, 0, 0);
    border-color: var(--green);
    width: 100px;
    cursor: pointer;

    :hover {
        color: rgb(255, 0, 0, 0.7);
        border-color: var(--color-accent);
        background-color: rgb(237, 227, 227, 0);
    }
`;

const CardBlock = ({ user, item, favorites, setFavorites }) => {
    console.log(favorites);

    let navigate = useNavigate();
    const handleClickDetailPage = () => {
        navigate('/shop/' + item._id);
    };

    const hanleDelete = () => {
        setFavorites(favorites.filter((favorite) => favorite._id !== item._id));

        const data = {
            user_id: user,
            item_id: item.item_code,
        };
        axios
            .post(`${process.env.REACT_APP_API_KEY}/favorite/delete`, data)
            .then((response) => {
                alert(response.data.message);
            })
            .catch((error) => {
                console.log('Error');
            });
    };

    return (
        <div className={clsx('col l-3 m-4 c-6', style.card)}>
            <Card className={style.cardBlock}>
                <CardMedia
                    component="img"
                    alt="green iguana"
                    height="270"
                    image={item.image}
                    onClick={() => handleClickDetailPage()}
                />
                <CardContent>
                    <Typography gutterBottom variant="h7" component="div">
                        {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        price: <span>{item.price}</span> won
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
                    <DeleteButton onClick={() => hanleDelete()} size="small">
                        {' '}
                        Delete{' '}
                    </DeleteButton>
                </CardActions>
            </Card>
        </div>
    );
};
function Favorite() {
    const context = useContext(contextUser);
    const { user, favorites, setFavorites } = context;

    return (
        <div className={style.wrapper}>
            <h2>Favorite</h2>

            {user ? (
                <div className={clsx('row')}>
                    {favorites.length > 0 ? (
                        favorites.map((item) => {
                            return (
                                <CardBlock
                                    key={item._id}
                                    user={user}
                                    item={item}
                                    favorites={favorites}
                                    setFavorites={setFavorites}
                                />
                            );
                        })
                    ) : (
                        <p className={clsx('col l-12')}>No thing</p>
                    )}
                </div>
            ) : (
                <p>You must Login</p>
            )}
        </div>
    );
}

export default Favorite;
