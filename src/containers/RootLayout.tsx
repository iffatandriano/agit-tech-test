import React from 'react';
import { Outlet } from 'react-router-dom';

const RootLayout = () => {
    return (
        <div className='pt-24 pb-24'>
            <Outlet />
        </div>
    );
};

export default RootLayout;