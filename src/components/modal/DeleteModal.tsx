import React, { useCallback, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import useDeleteModal from '../../utils/hooks/useDeleteModal';
import Modal from './Modal';

import { deleteUsers } from '../../services';

const DeleteModal = () => {
    const deleteModal = useDeleteModal();
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const onDelete = useCallback(() => {
        setIsLoading(true);

        deleteUsers(deleteModal.id)
            .then(() => {
                toast.success('User has been deleted!');
                navigate(0);
                deleteModal.setId('');
                deleteModal.onClose();
            })
            .catch(() => {
                toast.error('Something went wrong!');
            })
            .finally(() => {
                setIsLoading(false);
            })
    }, [deleteModal, setIsLoading, navigate]);

    const toggle = useCallback(() => {
        deleteModal.setId('');
        deleteModal.onClose();
    }, [deleteModal]);

    const bodyContent = (
        <div className='font-semibold text-lg items-center'>
            Are you sure want delete this user?
        </div>
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={deleteModal.isOpen}
            title='Delte User'
            actionLabel='Delete'
            onClose={deleteModal.onClose}
            onSubmit={onDelete}
            body={bodyContent}
            secondaryActionLabel='Cancel'
            secondaryAction={toggle}
        />
    );
};

export default DeleteModal;