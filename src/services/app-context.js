import { createContext, useState } from "react";

export const AppContext = createContext({
    person: null,
    products: [],
    admins: [],
    regions: [],
    categories: [],
    isDropdownVisible: false,
    isModalVisible: false,
    setIsDropdownVisible: null,
    setIsModalVisible: null,
    modalTitle: '',
    modalText: '',
    modalButtonText: '',
    modalButtonAction: '',
    setModalTitle: null,
    setModalText: null,
    setModalButtonText: null,
    setModalButtonAction: null,
    joke: '',
    login: () => {},
    signup: () => {},
    getAdmins: () => {},
    getCategories: () => {},
    geRegions: () => {},
    getProducts: () => {}
})

export const AppContextProvider = ({ children }) => {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalTitle, setModalTitle] = useState('Modal Title');
    const [modalText, setModalText] = useState('Modal Text');
    const [modalButtonText, setModalButtonText] = useState('Okay');
    const [modalButtonAction, setModalButtonAction] = useState(null);
    const [joke, setJoke] = useState("Why don't jokes work in octal? Because 7, 10, 11")

    const value = { joke, setJoke, modalButtonAction, setModalButtonAction, modalButtonText, setModalButtonText, modalText, setModalText, modalTitle, setModalTitle, isModalVisible, isDropdownVisible, setIsDropdownVisible, setIsModalVisible };

    return (
        <AppContext.Provider value={value}>{children}</AppContext.Provider>
    )
}