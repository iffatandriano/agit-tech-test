import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import {
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form';
import moment from 'moment';

import { postUsers } from '../../services';
import useUserModal from '../../utils/hooks/useUserModal';

import Modal from './Modal';
import Input from '../inputs/Input';
import InputSelect from '../inputs/Select';
import DatePicker from '../inputs/DatePicker';

const AddModal = () => {
    const addModal = useUserModal();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

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
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            groupAccess: '',
            expiredDate: ''
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

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        const datas = {
            ...data,
            groupAccess: data.groupAccess.value,
            expiredDate: moment(data.expiredDate).format()
        }

        postUsers(datas)
            .then(() => {
                toast.success('Success add user!');
                reset();
                navigate(0);
                addModal.onClose();
            })
            .catch((error) => {
                toast.error('Something went wrong');
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
            isOpen={addModal.isOpen}
            title='Add user'
            actionLabel='Submit'
            onClose={addModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
        />
    );
};

export default AddModal;