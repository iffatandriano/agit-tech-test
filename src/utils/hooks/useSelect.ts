import { groupAccess, sort } from "../dummy/groupAcess";

const optionsSelect = groupAccess.map((group) => ({
    value: group.value,
    label: group.label
}))

const optionsSort = sort.map((group) => ({
    value: group.value,
    label: group.label
}))

const useSelect = () => {
    const getAll = () => optionsSelect
    const getSort = () => optionsSort

    const getByValue = (value: string) => {
        return optionsSelect.find((item) => item.value === value);
    }

    return {
        getAll,
        getByValue,
        getSort
    }
}

export default useSelect;