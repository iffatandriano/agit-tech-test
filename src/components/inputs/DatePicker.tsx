import React from 'react';

import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

interface DatePickerProps {
    id: string;
    value: string;
    onChange: (value: any) => void;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
    required?: boolean;
    disabled?: boolean;
}

const DatePicker: React.FC<DatePickerProps> = ({
    id,
    value, 
    onChange,
    register,
    errors,
    required,
    disabled
}) => {
    return (
        <div className=''>
          <DateTimePicker 
            id={id}
            {...register(id, { required })}
            value={value} 
            amPmAriaLabel="AM/PM"
            onChange={(value) => onChange(value)} 
            disabled={disabled}
            className={`
                w-full
                disabled:opacity-70
                disabled:cursor-not-allowed
                rounded-lg 
                h-14
            `}
            required={required}
        />
        </div>
    );
};

export default DatePicker;