import { useState } from 'react';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import style from './PostItem.module.css';
import { styled } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import uniqid from 'uniqid';
import axios from 'axios';

const CustomizedButton = styled(Button)`
    margin: 8px;
    color: var(--green);
    border-color: var(--green);
    width: 170px;
    cursor: pointer;

    :hover {
        color: var(--color-accent);
        border-color: var(--color-accent);
        background-color: rgb(237, 227, 227, 0);
    }
`;
function PostItem() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [sex, setSex] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [descriptionUrl, setDescriptionUrl] = useState('');
    const [colors, setColors] = useState('White, Blue, Green, Red');
    const [sizes, setSizes] = useState('L, M ,S');
    const [type, setType] = useState('');
    const [itemCode, setItemCode] = useState('');
    const [price, setPrice] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        const dataOfItem = {
            title,
            description,
            sex,
            imgUrl: `https://res.cloudinary.com/do6sozxbo/image/upload/v1651726724/Vian_shop/items_image/men/top/images/${imgUrl}.jpg`,
            descriptionUrl: `https://res.cloudinary.com/do6sozxbo/image/upload/v1651726724/Vian_shop/items_image/men/top/description/A${descriptionUrl}.jpg`,
            colors: colors.trim().split(','),
            sizes: sizes.trim().split(','),
            type,
            itemCode,
            price,
        };
        axios
            .post(`${process.env.REACT_APP_API_KEY}/`, dataOfItem)
            .then((res) => {
                alert(res.data.message);
                console.log(' data ' + res.data);
            })
            .catch((err) => {
                console.log(err);
                alert(err.message);
            });
    };

    return (
        <div className={style.wrapper}>
            <h2 className={style.title}>PostItem</h2>
            <div className={style.inputBlock}>
                <TextField
                    required
                    sx={{ width: '350px', margin: '8px' }}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    id="outlined-required"
                    size="small"
                    label="Title"
                    variant="outlined"
                />
                <TextField
                    sx={{ width: '350px', margin: '8px' }}
                    id="outlined-basic"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    size="small"
                    label="Description"
                    variant="outlined"
                />
                <FormControl>
                    <InputLabel id="demo-simple-select-label">Sex</InputLabel>
                    <Select
                        sx={{ width: '350px', margin: '8px' }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={sex}
                        size="small"
                        label="Sex"
                        onChange={(e) => setSex(e.target.value)}
                    >
                        <MenuItem value="men">Men</MenuItem>
                        <MenuItem value="women">Women</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    sx={{ width: '350px', margin: '8px' }}
                    value={imgUrl}
                    onChange={(e) => setImgUrl(e.target.value)}
                    id="outlined-basic"
                    size="small"
                    label="Image Url"
                    variant="outlined"
                />
                <TextField
                    sx={{ width: '350px', margin: '8px' }}
                    value={descriptionUrl}
                    onChange={(e) => setDescriptionUrl(e.target.value)}
                    id="outlined-basic"
                    size="small"
                    label="Description Url"
                    variant="outlined"
                />
                <TextField
                    sx={{ width: '350px', margin: '8px' }}
                    value={colors}
                    onChange={(e) => setColors(e.target.value)}
                    id="outlined-basic"
                    size="small"
                    label="Colors"
                    variant="outlined"
                />
                <TextField
                    sx={{ width: '350px', margin: '8px' }}
                    value={sizes}
                    onChange={(e) => setSizes(e.target.value)}
                    id="outlined-basic"
                    size="small"
                    label="Size"
                    variant="outlined"
                />
                <FormControl>
                    <InputLabel id="demo-simple-select-label">Type</InputLabel>
                    <Select
                        sx={{ width: '350px', margin: '8px' }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={type}
                        size="small"
                        label="Type"
                        onChange={(e) => setType(e.target.value)}
                    >
                        <MenuItem value="tshirst">T-shirst</MenuItem>
                        <MenuItem value="hat">Hat</MenuItem>
                        <MenuItem value="shoes">Shoes</MenuItem>
                        <MenuItem value="outer">Outer</MenuItem>
                        <MenuItem value="trousers">Trousers</MenuItem>
                        <MenuItem value="short">Short</MenuItem>
                    </Select>
                </FormControl>
                <div>
                    <TextField
                        sx={{ width: '270px', margin: '8px' }}
                        value={itemCode}
                        onChange={(e) => setItemCode(e.target.value)}
                        id="outlined-basic"
                        size="small"
                        label="Item_code"
                        variant="outlined"
                    />
                    <CustomizedButton variant="outlined" sx={{ width: '40px' }} onClick={(e) => setItemCode(uniqid())}>
                        Gen
                    </CustomizedButton>
                </div>

                <TextField
                    sx={{ width: '350px', margin: '8px' }}
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    id="outlined-basic"
                    size="small"
                    label="Price"
                    variant="outlined"
                />

                <CustomizedButton variant="outlined" onClick={handleSubmit}>
                    Submit
                </CustomizedButton>
            </div>
        </div>
    );
}

export default PostItem;
