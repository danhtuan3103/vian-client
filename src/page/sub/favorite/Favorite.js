import style from './Favorite.module.css';
import clsx from 'clsx';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext, useState } from 'react';
import { contextUser } from '../../../App';

import Modal from '../../../components/Modal';
import Button from '../../../components/Button';

const CardBlock = ({ user, item, favorites, setFavorites }) => {
    const [isOpen, setIsOpen] = useState(false);

    console.log(favorites);
    let navigate = useNavigate();
    const handleClickDetailPage = () => {
        navigate('/shop/' + item._id);
    };

    const handleDelete = () => {
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
                    <Button onClick={() => handleClickDetailPage()} size="small">
                        Buy
                    </Button>
                    <Button onClick={() => setIsOpen(true)} size="small">
                        {' '}
                        Delete{' '}
                    </Button>
                </CardActions>
            </Card>

            {isOpen && (
                <Modal
                    setIsOpen={setIsOpen}
                    title="Notification"
                    dialogText="Are you sure you want to delete the item?"
                    rightBtn={
                        <Button onClick={() => setIsOpen(false)} secondary>
                            Cancel
                        </Button>
                    }
                    leftBtn={
                        <Button
                            onClick={() => handleDelete()}
                            primary
                            style={{
                                backgroundColor: 'red',
                            }}
                        >
                            {' '}
                            Delete
                        </Button>
                    }
                />
            )}
        </div>
    );
};
function Favorite() {
    const context = useContext(contextUser);
    const { user, favorites, setFavorites } = context;

    return (
        <div className={style.wrapper}>
            <h2>Favorite</h2>
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
        </div>
    );
}

export default Favorite;
