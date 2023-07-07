import React from 'react';

import Select from 'react-select';
import useSelect from '../../utils/hooks/useSelect';

export type SelectValue = {
    label: string;
    value: string;
}

interface SelectProps {
    value?: SelectValue;
    placeholder: string;
    onChange: (value: SelectValue) => void;
}

const InputSelect: React.FC<SelectProps> = ({
    value,
    onChange,
    placeholder
}) => {
    const { getAll } = useSelect();
    return (
        <div className=''>
            <Select 
                placeholder={placeholder}
                isClearable
                options={getAll()}
                value={value}
                onChange={(value) => onChange(value as SelectValue)}
                formatOptionLabel={(option: any) => (
                    <div className='flex flex-row items-center gap-3'>
                        <div>
                            {option.label}
                        </div>
                    </div>
                )}
                classNames={{
                    control: () => 'p-3 border-2',
                    input: () => 'text-lg',
                    option: () => 'text-lg'
                }}
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 6,
                    colors: {
                        ...theme.colors,
                        primary: 'black',
                        primary25: '#ffe4e6'
                    }
                })}
            />
        </div>
    );
};

export default InputSelect;