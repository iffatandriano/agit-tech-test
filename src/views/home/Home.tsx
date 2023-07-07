import React from 'react';
import Card from '../../components/card/Card';

const Home = () => {
    return (
        <Card>
            <div className='flex flex-col items-center gap-1'>
                <img src="/images/welcome.svg" alt='img_welcome' width="280" height="280" />
                <div className='text-2xl font-semibold text-neutral-800'>
                    Welcome
                </div>
                <div className='text-lg font-semibold text-neutral-800'>
                    Agit tech test
                </div>
            </div>
        </Card>
    );
};

export default Home;