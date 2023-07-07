import React from 'react';

import Navbar from '../components/navbar/Navbar';
import RootLayout from './RootLayout';
import AddModal from '../components/modal/AddModal';
import DeleteModal from '../components/modal/DeleteModal';
import EditModal from '../components/modal/EditModal';

const App = () => {
    return (
        <React.Fragment>
            <Navbar />
            <AddModal />
            <DeleteModal />
            <EditModal />
            <RootLayout />
        </React.Fragment>
    );
};

export default App;