import { createContext, useState } from "react";
import { ref, listAll, getDownloadURL, uploadBytes } from 'firebase/storage';
import { storage } from "../private/firebase";

export const AppContext = createContext({
    person: null,
    products: [],
    images: [],
    admins: [],
    regions: [],
    categories: [],
    modalRoute: null,
    isLoading: false,
    setIsLoading: null,
    setPerson: null,
    setProducts: null,
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
    logout: () => {},
    login: (email, password) => {},
    signup: (name, email, password, phoneNumber, region) => {},
    setNewPassword: (personId, password) => {},
    forgotPassword: (email) => {},
    upgrade: (id) => {},
    requestCategory: (email, category) => {},
    requestRegion: (region) => {},
    getImageUrl: (imageTitle) => {},
    addProduct: (title, price, category, description ) => {},
    uploadProductImage: (imageFile, imageName) => {},
    updateProduct: (productId, image) => {},
    getProductsByAdminId: (adminId) => {},
    productsPagination: (currentPage) => {},
    getImages: () => {},
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
    const [images, setImages] = useState([]);

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

    const getImages = async () => {
        const imagesRef = ref(storage, 'images/');
        const response = await listAll(imagesRef);
        setImages(response.items);
    }
    
    const getImageUrl = async (imageTitle) => {
        let imageUrl;
        for (let i = 0; i < images.length; i++){
            if(images[i]._location.path.split('images/')[1] === imageTitle){
                imageUrl = await getDownloadURL(images[i]);
            }
        }
        return imageUrl;
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

    const getProductsByAdminId = async (adminId) => {
        try {
            setIsLoading(true);
            const response = await fetch(`${url}/shop/admin/${adminId}`);
            const responseData = await response.json();
            if(!response.ok && response.status === 500 && !responseData.content){
                throw new Error('Unable to get products for this admin');
            }
            return responseData;
        } catch (err) {
            setModalTitle('Sorry');
            setModalText('An Unexpected Error Has Occurred');
            setModalButtonText('Okay');
            setModalRoute(null);
            setIsModalVisible(true);
        } finally {
            setIsLoading(false);
        }
    }

    const productsPagination = async (currentPage) => {
        try {
            setIsLoading(true);
            const response = await fetch(`${url}/shop/page?page=${currentPage}`);
            const responseData = await response.json();
            if(!response.ok && response.status === 500 && !responseData.content){
                throw new Error('Unable to get products for this page');
            }
            return responseData;
        } catch (err) {
            setModalTitle('Sorry');
            setModalText('An Unexpected Error Has Occurred');
            setModalButtonText('Okay');
            setModalRoute('/');
            setIsModalVisible(true);
        } finally {
            setIsLoading(false);
        }
    }

    const addProduct = async (title, price, category, description ) => {
        try {
            const response = await fetch(`${url}/shop/product`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${person.token}` }, body: JSON.stringify({ title, price, category, description, adminId: person.id }) });
            const responseData = await response.json();
            if(!response.ok && response.status === 500 && !responseData.content){
                throw new Error('Unable to create new product');
            }
            return responseData;
        } catch (err) {
            console.log(err);
        }
    }

    const uploadProductImage = async (imageFile, imageName) => {
        const imageUploadRef = ref(storage, `images/${imageName}`);
        try {
            await uploadBytes(imageUploadRef, imageFile);
        } catch (err) {
            console.log(err);
        }
        return imageName;
    }

    const updateProduct = async (productId, image) => {
        try {
            const response = await fetch(`${url}/shop/image/product/${productId}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ image, adminId: person.id }) });
            const responseData = await response.json();
            if(!response.ok && response.status === 500 && !responseData.content){
                throw new Error('Unable to create new product');
            }
            return responseData;
        } catch (err) {
            console.log(err);
        }
    }

    const value = { isLoading, images, setIsLoading, productsPagination, getProductsByAdminId, getImages, getImageUrl, addProduct, uploadProductImage, updateProduct, signup, upgrade, requestCategory, requestRegion, forgotPassword, setNewPassword, login, logout, modalRoute, setModalRoute, person, setPerson, products, setProducts, regions, categories, joke, setJoke, modalButtonText, setModalButtonText, modalText, setModalText, modalTitle, setModalTitle, isModalVisible, isDropdownVisible, setIsDropdownVisible, setIsModalVisible, getJoke, getCategories, getRegions, getProducts };

    return (
        <AppContext.Provider value={value}>{children}</AppContext.Provider>
    )
}