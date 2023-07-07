import { create } from 'zustand';

interface EditModalProps {
    isOpen: boolean,
    user: any,
    onOpen: () => void,
    onClose: () => void,
    setUser: (user: any) => void,
}

const useEditModal = create<EditModalProps>((set) => ({
    isOpen: false,
    user: {},
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false}),
    setUser: (user: any) => set({ user: user}),
}))

export default useEditModal;