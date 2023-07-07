import React from 'react';
import { Link } from 'react-router-dom';
import { slug } from '../../constants/slug';

const Logo = () => {
    return (
        <Link to={slug.home.to}>
            <img 
                className='cursor-pointer' 
                src='/logo.png' 
                alt='logo' 
                width="80"
                height="80"
            />
        </Link>
    );
};

export default Logo;