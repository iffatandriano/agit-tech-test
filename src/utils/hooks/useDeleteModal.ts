import { create } from 'zustand';

interface DeleteModalProps {
    isOpen: boolean,
    id: any,
    onOpen: () => void,
    onClose: () => void,
    setId: (id: any) => void,
}

const useDeleteModal = create<DeleteModalProps>((set) => ({
    isOpen: false,
    id: '',
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false}),
    setId: (id: any) => set({id: id})
}))

export default useDeleteModal;