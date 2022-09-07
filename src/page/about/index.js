import React from 'react';
import styles from './About.module.css';
import classNames from 'classnames/bind';

// const cx = classNames.bind(styles);
function About() {
    console.log('re-render');
    return <h2>About</h2>;
}

export default About;
