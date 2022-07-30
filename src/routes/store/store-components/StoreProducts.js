import React, { useEffect, useState } from 'react';
import ActivityIndicator from '../../../components/ui/ActivityIndicator';
import Card from '../../../components/ui/Card';
import { products } from '../../../utils/products';
import classes from './StoreProducts.module.css';

const StoreProducts = () => {

    const [pageNumber, setPageNumber]  = useState(1);
    const itemsPerPage = 8;
    const maxPages = Math.ceil(products.length / itemsPerPage);
    const [productsPerPage, setproductsPerPage] = useState([]);

    useEffect(() => {
        const productsToAdd = [];
        if (pageNumber < maxPages){
            for (let a = ((pageNumber * itemsPerPage) - itemsPerPage); a < (pageNumber * itemsPerPage); a++ ){
                productsToAdd.push(products[a]);
            }
        } else if (pageNumber === maxPages){
            for (let a = ((pageNumber * itemsPerPage) - itemsPerPage); a < products.length; a++ ){
                productsToAdd.push(products[a]);
            }
        } else if (products.legth <= 8) {
            for (let a = 0; a < 8; a++ ){
                productsToAdd.push(products[a]);
            }
        }
        setproductsPerPage(productsToAdd);
    }, [pageNumber, maxPages])

  return (
    <div className={classes.container}>
        <h1 className={classes.title}>All Products</h1>
        {/* <ActivityIndicator></ActivityIndicator> */}
        <div className={classes.productsContainer}>
            {productsPerPage.map((product) => <Card key={product.id} product={product}></Card>)}
        </div>
        <div className={classes.pagesContainer}>
            <div className={classes.pageItem}>1</div>
            <div className={classes.pageItem}>2</div>
            <div className={classes.pageItemActive}>3</div>
        </div>
    </div>
  )
}

export default StoreProducts