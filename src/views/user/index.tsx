import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

import Card from '../../components/card/Card';
import TableWrapper from '../../components/table/TableWrapper';
import Button from '../../components/Button';
import Container from '../../components/Container';
import SearchBar from '../../components/inputs/SearchBar';
import SortSelect from '../../components/inputs/SortSelect';

import useUserModal from '../../utils/hooks/useUserModal';
import { fetchUsers } from '../../store/states/users.state';

import { BsFillPersonPlusFill } from 'react-icons/bs';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';

const UserPage = () => {
    const dispatch = useDispatch<any>();
    const { records, error, params, isLoading } = useSelector((state: any) => state.users);
    const [searchText, setSearchText] = useState('');
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState({
        label: '',
        value: '',
    });

    const modal = useUserModal();

    useEffect(() => {
        if(!_.isEmpty(searchText)) {
            dispatch(fetchUsers({
                ...params,
                search: searchText,
                page: 1,
                order: sort?.value !== '' ? sort?.value : 'desc',
                sort: sort?.value !== '' ? sort?.value : 'desc',
            }));
            setPage(1);
        } else if(page) {
            dispatch(fetchUsers({
                ...params,
                search: searchText || null,
                page: page,
                order: sort?.value !== '' ? sort?.value : 'desc',
                sort: sort?.value !== '' ? sort?.value : 'desc',
            }))
        } else if(!_.isNull(sort) && sort?.value !== '') {
            dispatch(fetchUsers({
                ...params,
                search: searchText || null,
                page: page,
                order: sort?.value !== '' ? sort?.value : 'desc',
                sort: sort?.value !== '' ? sort?.value : 'desc',
            }))
        } else {
            dispatch(fetchUsers(params));
        }
    }, [
        dispatch, 
        params,
        searchText,
        page,
        sort,
    ]);

    const previousPage = useCallback(() => {
       setPage(page - 1);
    }, [setPage, page]);

    const nextPage = useCallback(() => {
        setPage(page + 1);
    }, [setPage, page]);

    return (
        <React.Fragment>
            <Container>
                <div className='mb-3 flex w-[40vw] md:w-[22vw] lg:w-[15vw]'>
                        <Button 
                            disabled={false} 
                            onClick={modal.onOpen} 
                            label='Add user'
                            icon={BsFillPersonPlusFill}
                        />
                </div>                
            </Container>
            <Card>
                <div className='flex flex-col gap-8'>
                    <div className='flex flex-row items-center justify-between gap-3'>
                        <div className='font-semibold text-lg'>
                            List User
                        </div>
                        <div className='flex float-right flex-row justify-end items-center gap-4'>
                            <SearchBar 
                                searchText={searchText} 
                                setSearchText={setSearchText} 
                                placeholderText='find user with id, firstname, lastname, etc'  
                                styleClass='mr-4'
                            />
                            <div>
                                <SortSelect value={sort} onChange={(value) => setSort(value)} placeholder='Sort' />
                            </div>
                        </div>
                    </div>
                    <hr />
                    <TableWrapper user={records} error={error} isLoading={isLoading} />
                    {!isLoading && (
                        <div className='w-[20vh] flex flex-row justify-end items-center gap-4 float-right'>
                            <Button
                                disabled={!_.isEmpty(records)} 
                                outline
                                onClick={previousPage}
                                icon={AiOutlineArrowLeft}
                            />
                            <span className='font-semibold text-lg'>{page}</span>
                            <Button 
                                disabled={_.isEmpty(records)}
                                outline
                                onClick={nextPage}
                                icon={AiOutlineArrowRight}
                            />
                        </div>
                    )}
                </div>
            </Card>
        </React.Fragment>
    );
};

export default UserPage;