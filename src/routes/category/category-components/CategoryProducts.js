import React from 'react';
import Card from '../../../components/ui/Card';
import { products } from '../../../utils/products';
import classes from './CategoryProducts.module.css';

const CategoryProducts = () => {
  return (
    <div className={classes.container}>
        <div className={classes.spacingContainer}></div>
        <div className={classes.headerContainer}>
            <p className={classes.headerTitle}>Category Title</p>
            <div className={classes.headerFilterContainer}>
                <p className={classes.headerTitle}>Sort By: </p>
                <select className={classes.headerSelect}>
                    <option>Price</option>
                    <option>Date Added</option>
                </select>
            </div>
        </div>
        <div className={classes.spacingContainer}></div>
        {/* <p className={classes.emptyText}> There no products for this category yet</p> */}
        <div className={classes.productsContainer}>
            {products.map((product) => <Card key={product.id} product={product}></Card>)}
        </div>
        <div className={classes.spacingContainer}></div>
    </div>
  )
}

export default CategoryProducts