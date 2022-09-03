import style from './Ads.module.css';
import clsx from 'clsx';

function Ads({ value }) {

    const [img, text] = value;
    return (
        <div className={style.AdsBlock}>
            <div className={style.imgBlock}>
                <img src={img} alt='img' >
                </img>
                <p>{text}</p>

            </div>
        </div>
    )
}

export default Ads;