/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import {
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form';
import moment from 'moment';
import _ from 'lodash';

import useEditModal from '../../utils/hooks/useEditModal';
import Modal from './Modal';
import Input from '../inputs/Input';
import InputSelect from '../inputs/Select';
import DatePicker from '../inputs/DatePicker';
import useSelect from '../../utils/hooks/useSelect';
import { editUsers } from '../../services';

const EditModal = () => {
    const editModal = useEditModal();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { getByValue } = useSelect();

    const isEditMode = !_.isEmpty(editModal.user.id);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        }, 
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            firstName: editModal.user.firstName,
            lastName: editModal.user.lastName,
            username: editModal.user.username,
            email: editModal.user.email,
            password: editModal.user.password,
            confirmPassword: editModal.user.confirmPassword,
            groupAccess: editModal.user.groupAccess,
            expiredDate: moment(editModal.user.expiredDate).format('DD/MM/YYYY HH:MM')
        }
    })

    const groupAccess = watch('groupAccess');
    const expiredDate = watch('expiredDate');

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
        })
    }

    useEffect(() => {
        if(isEditMode) {
            setValue('firstName', editModal.user.firstName);
            setValue('lastName', editModal.user.lastName);
            setValue('username', editModal.user.username);
            setValue('email', editModal.user.email);
            setValue('password', editModal.user.password);
            setValue('confirmPassword', editModal.user.confirmPassword);
            setValue('groupAccess', getByValue(editModal.user.groupAccess));
            setValue('expiredDate', moment(editModal.user.expiredDate).format('DD/MM/YYYY HH:MM'));
        }
    }, [isEditMode]);

    const onClose = useCallback(() => {
        setValue('firstName', '');
        setValue('lastName', '');
        setValue('username', '');
        setValue('email', '');
        setValue('password', '');
        setValue('confirmPassword', '');
        setValue('groupAccess', '');
        setValue('expiredDate', '');

        editModal.setUser({});
        editModal.onClose();
    }, [editModal, setValue]);

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        const datas: any = {
            ...data,
            groupAccess: data.groupAccess.value,
            expiredDate: moment(data.expiredDate).format()
        }

        editUsers(editModal.user.id, datas)
            .then(() => {
                toast.success('Edit user has been saved!');
                reset();
                editModal.setUser({});
                navigate(0);
                editModal.onClose();
            })
            .catch((error) => {
                toast.error('Something went wrong!');
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    const bodyContent = (
        <div className='flex flex-col gap-2'>
            <Input 
                id="firstName" 
                label='First Name' 
                disabled={isLoading} 
                register={register}  
                errors={errors}
                required
            />
            <Input 
                id="lastName" 
                label='Last Name' 
                disabled={isLoading} 
                register={register}  
                errors={errors}
                required
            />
            <Input 
                id="username" 
                label='Username' 
                disabled={isLoading} 
                register={register}  
                errors={errors}
                required
            />
            <Input 
                id="email" 
                type='email'
                label='Email' 
                disabled={isLoading} 
                register={register}  
                errors={errors}
                required
            />
            <Input 
                id="password"
                type='password' 
                label='Password' 
                disabled={isLoading} 
                register={register}  
                errors={errors}
                required
            />
            <Input 
                id="confirmPassword"
                type='password' 
                label='Confirm password' 
                disabled={isLoading} 
                register={register}  
                errors={errors}
                required
            />
            <InputSelect 
                placeholder='Group access'
                value={groupAccess}
                onChange={(value) => setCustomValue('groupAccess', value)}
            />
            <DatePicker 
                id='expiredDate'
                disabled={isLoading}
                value={expiredDate} 
                onChange={(value) => setCustomValue('expiredDate', value)}
                required
                register={register}
                errors={errors} 
            />
        </div>
    )

    return (
        <Modal 
            disabled={isLoading}
            isOpen={editModal.isOpen}
            title='Edit user'
            actionLabel='Edit'
            onClose={onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
        />
    );
};

export default EditModal;