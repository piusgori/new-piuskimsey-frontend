import React, { useContext, useEffect, useState } from 'react';
import ActivityIndicator from '../../../components/ui/ActivityIndicator';
import Button from '../../../components/ui/Button';
import Card from '../../../components/ui/Card';
import { AppContext } from '../../../services/app-context';
import classes from './StoreProducts.module.css';

const StoreProducts = () => {
    const buttonStyle = { marginBottom: 15};
    const [pageNumber, setPageNumber] = useState(1);
    const [pageProducts, setPageProducts] = useState([]);
    const [perPage, setPerPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [isOnePage, setIsOnePage] = useState(false);
    const { isLoading, setModalAnimation, productsPagination, setModalTitle, setModalText, setModalButtonText, setModalRoute, setIsModalVisible } = useContext(AppContext);

    const getProductsForCurrentPage = async (page) => {
        try {
            const data = await productsPagination(page);
            setPageProducts(data.products);
            setTotal(data.totalItems);
            setPerPage(data.perPage);
            data.totalItems <= data.perPage ? setIsOnePage(true) : setIsOnePage(false);
        } catch (err) {
            setModalTitle('We Are Sorry');
            setModalText('An Unexpected Error has Occured. Sorry about that');
            setModalButtonText('Okay');
            setModalAnimation(3);
            setModalRoute('/');
            setIsModalVisible(true);
        }
    }

    const seeMoreProductsHandler = async (method) => {
        if(method === 'increase' && total > perPage * pageNumber && !isOnePage){
            const nextPage = pageNumber + 1;
            setPageNumber(prevPage => prevPage + 1);
            await getProductsForCurrentPage(nextPage);
        } else if(method === 'decrease' && (pageNumber - 1) * perPage !== 0 && !isOnePage) {
            const previousPage = pageNumber - 1;
            setPageNumber(prevPage => prevPage - 1);
            await getProductsForCurrentPage(previousPage);
        }
    }

    const nextPageHandler = async () => {
        await seeMoreProductsHandler('increase');
    }
    const previousPageHandler = async () => {
        await seeMoreProductsHandler('decrease');
    }

    useEffect(() => {
        const gettingPages = async () => {
            await getProductsForCurrentPage(pageNumber)
        };
        gettingPages();
        // eslint-disable-next-line
    }, [])

  return (
    <div className={classes.container}>
        <h1 className={classes.title}>All Products</h1>
        {isLoading && <ActivityIndicator></ActivityIndicator>}
        {!isLoading && <div className={classes.productsContainer}>
            {pageProducts.length === 0 && <p className={classes.emptyText}>No products have been added yet</p>}
            {pageProducts.length > 0 && pageProducts.map((product) => <Card key={product.id} product={product}></Card>)}
        </div>}
        {!isOnePage && !isLoading && <div className={classes.pagesContainer}>
            {total > perPage * pageNumber && <Button onClick={nextPageHandler} style={buttonStyle}>Next</Button>}
            {(pageNumber - 1) * perPage !== 0 && <Button onClick={previousPageHandler} style={buttonStyle}>Previous</Button>}
        </div>}
    </div>
  )
}

export default StoreProducts