import style from './Header.module.css';
import clsx from 'clsx';
import Button from '../../../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';

// Mui Icon
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { useState, useContext, useEffect } from 'react';

//mobile nav
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';

import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import Badge from '@mui/material/Badge';

import ItemInBag from '../../sub/itemInBag/ItemInBag';

import { contextUser } from '../../../App';
import axios from 'axios';

const CustomizedTextField = styled(TextField)`
    height: 10px;
    margin-top: -10px;
`;

function Header() {
    const [search, setSearch] = useState('');
    const [visible, setVisible] = useState(false);
    const [searchItems, setSearchItems] = useState([]);
    const [drawer, setDrawer] = useState(false);
    const [openBag, setOpenBag] = useState(false);

    const context = useContext(contextUser);
    const bag = context.bag;

    const navigate = useNavigate();
    const user = context.user;
    let bagNumber = bag.length;

    useEffect(() => {
        setSearchItems([]);

        const isVisibale = search !== '';
        setVisible(isVisibale);
        axios.get(`${process.env.REACT_APP_API_KEY}/`).then((response) => {
            const result = response.data;
            const newItem = result.filter((item) => {
                return item.title.toLowerCase().includes(search.toLowerCase());
            });
            setSearchItems(newItem);
        });
    }, [search]);

    const handleSearch = (e) => {};

    const handleDrawer = () => {
        setDrawer(true);
        setOpenBag(false);
        // overlay.style.display = "block";
    };

    const handleDrawerCloser = () => {
        setDrawer(false);
        setOpenBag(false);
        setVisible(false);
        // overlay.style.display = "none";
    };

    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
    }));

    const handleOpenBag = () => {
        setOpenBag(true);
        setDrawer(false);
        // overlay.style.display = "block";
    };
    return (
        <div className={clsx('grid wide', style.wrapper)}>
            {/* Bag  */}
            <Drawer
                sx={{
                    flexShrink: 0,
                    zIndex: 2,
                }}
                variant="persistent"
                anchor="right"
                open={openBag}
            >
                <div className={style.drawerHeader}>
                    <Button secondary large style={{ minWidth: '50px' }} onClick={handleDrawerCloser}>
                        <ChevronRightIcon className={style.closeIcon} />
                    </Button>
                    <div className={style.drawerText}>
                        <h2>Your Bag</h2>
                    </div>
                </div>

                {bag.length > 0 ? (
                    bag.map((item) => <ItemInBag key={item.selected_id} data={item} />)
                ) : (
                    <p style={{ fontSize: '1rem', color: 'red' }}>Nothing</p>
                )}
                {bag.length > 0 && (
                    <div>
                        <Button
                            primary
                            style={{ fontSize: '1.1rem' }}
                            onClick={() => {
                                handleDrawerCloser();
                                navigate('/bag/payment');
                            }}
                        >
                            Go to payment
                        </Button>
                    </div>
                )}
            </Drawer>
            <div
                id="overlay"
                className={clsx(style.overlay, openBag || drawer || visible ? style.active : '')}
                onClick={() => handleDrawerCloser()}
            ></div>

            {/* PC Nav  */}
            <div className={clsx('row', style.nav)}>
                <div className={clsx('col l-5 m-6', style.navLink)}>
                    <ul>
                        <li>
                            <Button
                                secondary
                                style={{
                                    fontSize: '1.1rem',
                                }}
                                to="/shop"
                            >
                                Shop
                            </Button>
                        </li>
                        <li>
                            <Button
                                secondary
                                style={{
                                    fontSize: '1.1rem',
                                }}
                                to="/women"
                            >
                                Women
                            </Button>
                        </li>
                        <li>
                            <Button
                                secondary
                                style={{
                                    fontSize: '1.1rem',
                                }}
                                to="/men"
                            >
                                Men
                            </Button>
                        </li>
                        <li>
                            <Button
                                secondary
                                style={{
                                    fontSize: '1.1rem',
                                }}
                                to="/about"
                            >
                                About
                            </Button>
                        </li>
                    </ul>
                </div>
                <div className={clsx('col l-2 m-0', style.logo)}>
                    <Link to="/">VIAN</Link>
                </div>

                <div className={clsx('col l-5 grid', style.toolOfNav)}>
                    <ul className={clsx(style.tool, 'row')}>
                        <li
                            className={clsx(style.searchTool, 'col l-6 m-0')}
                            style={{
                                zIndex: 5,
                            }}
                        >
                            <div className={clsx(style.searchBlock)}>
                                <CustomizedTextField
                                    className={style.input}
                                    value={search}
                                    onClick={(e) => {
                                        setVisible(true);
                                        setOpenBag(false);
                                    }}
                                    onChange={(e) => setSearch(e.target.value)}
                                    size="small"
                                    margin="none"
                                    id="standard-basic"
                                    variant="standard"
                                />
                                <SearchIcon
                                    onClick={(e) => handleSearch(e)}
                                    id="searchIcon"
                                    fontSize="medium"
                                    className={style.searchIcon}
                                />
                            </div>
                            <ul className={clsx(style.searchList, visible && style.active)}>
                                {searchItems?.length > 0 && search !== '' ? (
                                    searchItems.map((item) => {
                                        return (
                                            <li
                                                key={item._id}
                                                className={style.searchItem}
                                                onClick={() => {
                                                    window.location.href = `/shop/${item._id}`;
                                                    setVisible(false);
                                                }}
                                            >
                                                <img src={item.image} style={{ width: '90px' }} />
                                                <div className={style.content}>
                                                    <p style={{ fontSize: '1rem', color: 'var(--green)' }}>
                                                        {item.title}
                                                    </p>
                                                    <p style={{ fontSize: '1rem', color: '#333' }}>
                                                        {item.description}
                                                    </p>
                                                </div>
                                            </li>
                                        );
                                    })
                                ) : (
                                    <li className={style.searchItem} style={{ justifyContent: 'center' }}>
                                        Nothing
                                    </li>
                                )}
                            </ul>
                        </li>
                        <li className={clsx(style.card, 'col l-3 m-6')}>
                            <Badge color="secondary" badgeContent={bagNumber} showZero>
                                <Button
                                    secondary
                                    style={{ padding: 0, margin: 0, minWidth: '60px', fontSize: '1.1rem' }}
                                    onClick={() => handleOpenBag()}
                                >
                                    Bag
                                </Button>
                            </Badge>
                        </li>
                        <li className={clsx(style.loginBtn, 'col l-3 m-6', style.dropDown)}>
                            {user ? (
                                <Button
                                    secondary
                                    style={{ padding: 0, margin: 0, minWidth: '60px', fontSize: '1.1rem' }}
                                >
                                    <AccountCircleIcon className={style.dropdownIcon} />
                                </Button>
                            ) : (
                                <Link to="/login">Login</Link>
                            )}
                            <div className={style.dropdownContent}>
                                <Link to="/account">My Account</Link>
                                <Link to="/my-favorite">
                                    Favorite <FavoriteIcon sx={{ width: '16px', margin: 0 }} />
                                </Link>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            {/* mobile navigate */}
            <div className={style.mobileNav}>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static" sx={{ backgroundColor: '#00665e' }}>
                        <Toolbar>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ ml: '.3px' }}
                                onClick={handleDrawer}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Drawer
                                sx={{
                                    flexShrink: 0,
                                    zIndex: 5,
                                }}
                                variant="persistent"
                                anchor="left"
                                open={drawer}
                            >
                                <div className={style.closeMenuBlock}>
                                    <Button secondary large style={{ minWidth: '50px' }} onClick={handleDrawerCloser}>
                                        <ChevronLeftIcon style={{ fontSize: '24px', margin: 0, padding: 0 }} />
                                    </Button>
                                </div>

                                <hr style={{ height: '1px', margin: '4px 0', width: '100%' }}></hr>

                                <List sx={{ width: 350 }} className={style.list}>
                                    <li>
                                        <Button
                                            small
                                            secondary
                                            style={{ fontSize: '1.1rem' }}
                                            onClick={() => handleDrawerCloser()}
                                            to="/shop"
                                        >
                                            Shop
                                        </Button>
                                    </li>
                                    <li>
                                        <Button
                                            small
                                            secondary
                                            style={{ fontSize: '1.1rem' }}
                                            onClick={() => handleDrawerCloser()}
                                            to="/women"
                                        >
                                            Women
                                        </Button>
                                    </li>
                                    <li>
                                        <Button
                                            small
                                            secondary
                                            style={{ fontSize: '1.1rem' }}
                                            onClick={() => handleDrawerCloser()}
                                            to="/men"
                                        >
                                            Men
                                        </Button>
                                    </li>
                                    <li>
                                        <Button
                                            small
                                            secondary
                                            style={{ fontSize: '1.1rem' }}
                                            onClick={() => handleDrawerCloser()}
                                            to="/about"
                                        >
                                            About
                                        </Button>
                                    </li>
                                </List>
                                <hr style={{ height: '1px', margin: '4px 0', width: '100%' }}></hr>
                                <List sx={{ width: 350 }} className={style.list}>
                                    <li>
                                        <Button
                                            small
                                            secondary
                                            style={{ fontSize: '1.1rem' }}
                                            to="shop/type/hat"
                                            onClick={() => handleDrawerCloser()}
                                        >
                                            Hat
                                        </Button>
                                    </li>
                                    <li>
                                        <Button
                                            small
                                            secondary
                                            style={{ fontSize: '1.1rem' }}
                                            to="shop/type/tshirst"
                                            onClick={() => handleDrawerCloser()}
                                        >
                                            T-shirst
                                        </Button>
                                    </li>
                                    <li>
                                        <Button
                                            small
                                            secondary
                                            style={{ fontSize: '1.1rem' }}
                                            to="shop/type/trouser"
                                            onClick={() => handleDrawerCloser()}
                                        >
                                            Trousers
                                        </Button>
                                    </li>
                                    <li>
                                        <Button
                                            small
                                            secondary
                                            style={{ fontSize: '1.1rem' }}
                                            to="/shop/type/shoes"
                                            onClick={() => handleDrawerCloser()}
                                        >
                                            Shoes
                                        </Button>
                                    </li>
                                    <li>
                                        <Button
                                            small
                                            secondary
                                            style={{ fontSize: '1.1rem' }}
                                            to="/shop/type/outer"
                                            onClick={() => handleDrawerCloser()}
                                        >
                                            uter
                                        </Button>
                                    </li>
                                    <li>
                                        <Button
                                            small
                                            secondary
                                            style={{ fontSize: '1.1rem' }}
                                            to="/shop/type/short"
                                            onClick={() => handleDrawerCloser()}
                                        >
                                            Short
                                        </Button>
                                    </li>

                                    <li>
                                        <Button
                                            small
                                            secondary
                                            style={{ fontSize: '1.1rem' }}
                                            to="/my-favorite"
                                            onClick={() => handleDrawerCloser()}
                                        >
                                            Favorite <FavoriteIcon sx={{ width: '16px', margin: 0 }} />
                                        </Button>
                                    </li>
                                </List>
                                <hr style={{ height: '1px', margin: '4px 0', width: '100%' }}></hr>
                            </Drawer>

                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                <div className={style.logo}>
                                    <Link to="/">VIAN</Link>
                                </div>
                            </Typography>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ ml: '.3px' }}
                                onClick={() => handleOpenBag()}
                            >
                                <Badge color="secondary" badgeContent={bagNumber} showZero>
                                    <ShoppingBagIcon />
                                </Badge>
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                </Box>
            </div>
        </div>
    );
}

export default Header;
