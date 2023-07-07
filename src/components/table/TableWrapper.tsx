import React, { useCallback } from 'react';
import moment from 'moment';
import _ from 'lodash';

import Button from '../Button';

import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';

import useDeleteModal from '../../utils/hooks/useDeleteModal';
import useEditModal from '../../utils/hooks/useEditModal';

interface TableWrapperProps {
    user: any;
    error?: any;
    isLoading?: boolean;
}

const TableWrapper: React.FC<TableWrapperProps> = ({ user, error, isLoading }) => {
    
    const editModal = useEditModal();
    const deleteModal = useDeleteModal();

    const toggleDelete = useCallback((id: any) => {
        deleteModal.setId(id);
        deleteModal.onOpen();

    }, [deleteModal])

    const toggleEdit = useCallback((user: any) => {
        editModal.setUser(user);
        editModal.onOpen();
    }, [editModal])

    return (
        <div className='overflow-x-auto w-full h-full pb-6 bg-base-100'>
            <table className='table-auto w-full'>
                <thead>
                    <tr>
                        <th className='font-semibold text-lg'>Id</th>
                        <th className='font-semibold text-lg'>Firstname</th>
                        <th className='font-semibold text-lg'>Lastname</th>
                        <th className='font-semibold text-lg'>Email</th>
                        <th className='font-semibold text-lg'>Username</th>
                        <th className='font-semibold text-lg'>Group Access</th>
                        <th className='font-semibold text-lg'>Expired Date</th>
                        <th className='font-semibold text-lg'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading ? (
                        <div className="status flex justify-centet items-center mt-10 text-center">
                        <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                    ) : _.isUndefined(user) || _.isEmpty(user) || error ? (
                        <tr className='text-center justify-center text-red-600 font-bold'>
                            <td>
                                User has not found.
                            </td>
                        </tr>
                    ) : _.isArray(user) && user?.length > 0 ? user?.map((item: any) => (
                        <tr key={item.id} className='text-center'>
                            <td>{item.id}</td>
                            <td>{item.firstName}</td>
                            <td>{item.lastName}</td>
                            <td>{item.email}</td>
                            <td>{item.username}</td>
                            <td>{item.groupAccess}</td>
                            <td>{moment(item.expiredDate).format('Do MMM YY')}</td>
                            <td className='flex flex-row items-center gap-3'>
                                <Button outline onClick={() => toggleEdit(item)} icon={AiOutlineEdit} />
                                <Button onClick={() => toggleDelete(item.id)} icon={AiOutlineDelete} />
                            </td>
                        </tr>
                    )) : (
                        <tr key={user.id} className='text-center'>
                            <td>{user.id}</td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.username}</td>
                            <td>{user.groupAccess}</td>
                            <td>{moment(user.expiredDate).format('Do MMM YY')}</td>
                            <td className='flex flex-row items-center gap-3'>
                                <Button outline onClick={() => toggleEdit(user)} icon={AiOutlineEdit} />
                                <Button onClick={() => toggleDelete(user.id)} icon={AiOutlineDelete} />
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default TableWrapper;