import React from 'react';
import { NavLink } from 'react-router-dom';
import { slug } from '../../constants/slug';

const Menu = () => {
    return (
        <div className='relative'>
            <div className='flex flex-row gap-3'>
                <NavLink to={slug.home.to} className={({isActive, isPending}) => {
                    return isActive ? 'font-semibold' : isPending ? 'font-normal' : ''
                }}>
                    Home
                </NavLink>
                <NavLink to={slug.user.path} className={({isActive, isPending}) => {
                    return isActive ? 'font-semibold' : isPending ? 'font-normal' : ''
                }}>
                    User
                </NavLink>
            </div>
        </div>
    );
};

export default Menu;