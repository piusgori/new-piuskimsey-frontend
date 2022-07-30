import React from 'react';
import classes from './LatestProducts.module.css'
import { products } from '../../../utils/products';
import Card from '../../../components/ui/Card';

const LatestProducts = () => {
  return (
    <div className={classes.container}>
        <h1 className={classes.title}>Latest Products</h1>
        <p className={classes.text}>Any product you want to have available at this store!</p>
        <div className={classes.productsContainer}>
            {products.length === 0 && <p className={classes.text}>There no products yet</p>}
            {products.length > 0 && products.map((product) => <Card key={product.id} product={product}></Card>)}
        </div>
    </div>
  )
}

export default LatestProducts