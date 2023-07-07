import React from 'react';
import Container from '../Container';

interface CardProps {
    children: React.ReactNode
}

const Card: React.FC<CardProps> = ({ children }) => {
    return (
        <Container>
            <div className='card w-full p-6 bg-base-100 shadow-xl rounded-lg'>
                {children}
            </div>
        </Container>
    );
};

export default Card;