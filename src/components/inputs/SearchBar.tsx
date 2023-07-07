import React, { Dispatch, SetStateAction } from 'react';

interface SearchBarProps {
    searchText: string,
    styleClass: string,
    setSearchText: Dispatch<SetStateAction<string>>,
    placeholderText?: string,
}

const SearchBar: React.FC<SearchBarProps> = ({
    searchText,
    styleClass,
    setSearchText,
    placeholderText,
}) => {

    const updateSearchInput = (value: any) => {
        setSearchText(value)
    }
        
  return (
        <div className={"inline-block " + styleClass}>
            <div className="input-group  relative flex flex-wrap items-stretch w-full ">
              <input 
                    type="search" 
                    value={searchText} 
                    placeholder={placeholderText || "Search"} 
                    onChange={(e) => updateSearchInput(e.target.value)} 
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    id="username" 
                />
            </div>
        </div>
  )
};

export default SearchBar;