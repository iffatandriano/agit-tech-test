import React from 'react';

import Select from 'react-select';
import useSelect from '../../utils/hooks/useSelect';

export type SelectValue = {
    label: string;
    value: string;
}

interface SortSelectProps {
    value?: SelectValue;
    placeholder: string;
    onChange: (value: SelectValue) => void;
}

const SortSelect: React.FC<SortSelectProps> = ({
    value,
    onChange,
    placeholder
}) => {
    const { getSort } = useSelect();
    return (
        <div className=''>
            <Select 
                placeholder={placeholder}
                isClearable
                options={getSort()}
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

export default SortSelect;