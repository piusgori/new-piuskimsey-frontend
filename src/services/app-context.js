import { createContext, useState } from "react";

export const AppContext = createContext({
    person: null,
    products: [],
    admins: [],
    regions: [],
    categories: [],
    modalRoute: null,
    logout: null,
    isLoading: false,
    setIsLoading: null,
    setPerson: null,
    setModalRoute: null,
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
    joke: '',
    login: (email, password) => {},
    signup: (name, email, password, phoneNumber, region) => {},
    setNewPassword: (personId, password) => {},
    forgotPassword: (email) => {},
    upgrade: (id) => {},
    requestCategory: (email, category) => {},
    requestRegion: (region) => {},
    getAdmins: () => {},
    getCategories: () => {},
    getRegions: () => {},
    getProducts: () => {},
    getJoke: () => {},
})

export const AppContextProvider = ({ children }) => {

    const url = 'http://localhost:8000';
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalTitle, setModalTitle] = useState('Modal Title');
    const [modalText, setModalText] = useState('Modal Text');
    const [modalButtonText, setModalButtonText] = useState('Okay');
    const [modalRoute, setModalRoute] = useState(null);
    const [joke, setJoke] = useState('Why don\'t jokes work in octal? Because 7, 10, 11');
    const [categories, setCategories] = useState([]);
    const [regions, setRegions] = useState([]);
    const [products, setProducts] = useState([]);
    const [person, setPerson] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const getJoke = async () => {
        try {
            const response = await fetch(url);
            const responseData = await response.json();
            if(!response.ok && response.status === 500){
                throw new Error('Unable to reach the server');
            }
            setJoke(responseData.joke);
        } catch (err) {
            setModalTitle('Sorry');
            setModalText('An Unexpected Error Has Occurred');
            setModalButtonText('Okay');
            setModalRoute('/');
            setIsModalVisible(true);
        }
    }

    const getCategories = async () => {
        try {
            const response = await fetch(`${url}/shop/category`);
            const responseData = await response.json();
            if(!response.ok && response.status === 500){
                throw new Error('Unable to get categories');
            }
            setCategories(responseData.categories)
        } catch (err) {
            setModalTitle('Sorry');
            setModalText('An Unexpected Error Has Occurred');
            setModalButtonText('Okay');
            setModalRoute('/');
            setIsModalVisible(true);
        }
    }

    const getRegions = async () => {
        try {
            const response = await fetch(`${url}/auth/region`);
            const responseData = await response.json();
            if(!response.ok && response.status === 500){
                throw new Error('Unable to get regions');
            }
            setRegions(responseData.regions);
        } catch (err) {
            setModalTitle('Sorry');
            setModalText('An Unexpected Error Has Occurred');
            setModalButtonText('Okay');
            setModalRoute('/');
            setIsModalVisible(true);
        }
    }

    const getProducts = async () => {
        try {
            const response = await fetch(`${url}/shop`);
            const responseData = await response.json();
            if(!response.ok && response.status === 500){
                throw new Error('Unable to get products');
            }
            setProducts(responseData.products)
        } catch (err) {
            setModalTitle('Sorry');
            setModalText('An Unexpected Error Has Occurred');
            setModalButtonText('Okay');
            setModalRoute('/')
            setIsModalVisible(true);
        }
    }

    const signup = async (name, email, password, phoneNumber, region) => {
        try {
            setIsLoading(true);
            const response = await fetch(`${url}/auth/signup`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, email, password, phoneNumber, region }) });
            const responseData = await response.json();
            if(!response.ok && response.status === 500 && !responseData.content){
                throw new Error('Unable to sign up for a new account');
            }
            return responseData;
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    }

    const login = async (email, password) => {
        try {
            setIsLoading(true);
            const response = await fetch(`${url}/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) });
            const responseData = await response.json();
            if(!response.ok && response.status === 500 && !responseData.content){
                throw new Error('Unable to login to account');
            }
            return responseData;
        } catch(err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    }

    const forgotPassword = async (email) => {
        try {
            setIsLoading(true);
            const response = await fetch(`${url}/auth/forgot-password`, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ email }) });
            const responseData = await response.json();
            if(!response.ok && response.status === 500 && !responseData.content){
                throw new Error('Unable to make request for password reset link');
            }
            return responseData;
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    }

    const logout = () => {
        setPerson(null)
        localStorage.removeItem('person');
        setModalTitle('Success');
        setModalText('You have logged out Successfully');
        setModalButtonText('Okay');
        setModalRoute('/');
        setIsModalVisible(true);
    }

    const setNewPassword = async (personId, password) => {
        try {
            setIsLoading(true);
            const response = await fetch(`${url}/auth/new-password/${personId}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }) });
            const responseData = await response.json();
            if(!response.ok && response.status === 500 && !responseData.content){
                throw new Error('Unable to set new password');
            }
            return responseData;
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    }

    const upgrade = async (id) => {
        try {
            setIsLoading(true);
            const response = await fetch(`${url}/auth/upgrade/${id}`, { method: 'POST', headers: { 'Content-Type': 'application/json' } });
            const responseData = await response.json();
            if(!response.ok && response.status === 500 && !responseData.content){
                throw new Error('Unable to upgrade user to admin');
            }
            return responseData;
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    }

    const requestCategory = async (email, category) => {
        try {
            setIsLoading(true);
            const response = await fetch(`${url}/auth/request/category`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, category }) });
            const responseData = await response.json();
            if(!response.ok && response.status === 500 && !responseData.content){
                throw new Error('Unable to request category named in the form');
            }
            return responseData;
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    }

    const requestRegion = async (region) => {
        try {
            setIsLoading(true);
            const response = await fetch(`${url}/auth/request/region`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ region }) });
            const responseData = await response.json();
            if(!response.ok && response.status === 500 && !responseData.content){
                throw new Error('Unable to request category named in the form');
            }
            return responseData;
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    }

    const value = { isLoading, setIsLoading, signup, upgrade, requestCategory, requestRegion, forgotPassword, setNewPassword, login, logout, modalRoute, setModalRoute, person, setPerson, products, regions, categories, joke, setJoke, modalButtonText, setModalButtonText, modalText, setModalText, modalTitle, setModalTitle, isModalVisible, isDropdownVisible, setIsDropdownVisible, setIsModalVisible, getJoke, getCategories, getRegions, getProducts };

    return (
        <AppContext.Provider value={value}>{children}</AppContext.Provider>
    )
}