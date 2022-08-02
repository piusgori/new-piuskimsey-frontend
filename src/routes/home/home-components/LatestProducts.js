import React, { useContext } from 'react';
import classes from './LatestProducts.module.css'
import Card from '../../../components/ui/Card';
import { AppContext } from '../../../services/app-context';

const LatestProducts = () => {

  const { products } = useContext(AppContext)

  return (
    <div className={classes.container}>
        <h1 className={classes.title}>Latest Products</h1>
        <p className={classes.text}>Any product you want to have available at this store!</p>
        <div className={classes.productsContainer}>
            {products.length === 0 && <p className={classes.text}>There no products yet</p>}
            {products.length > 0 && products.length <=7 && products.sort((a, b) => (new Date(b.createdAt).getTime()) - (new Date(a.createdAt).getTime())).map((product) => <Card key={product.id} product={product}></Card>)}
            {products.length > 0 && products.length > 7 && products.sort((a, b) => (new Date(b.createdAt).getTime()) - (new Date(a.createdAt).getTime())).filter((produce, index) => index <= 7).map((product) => <Card key={product.id} product={product}></Card>)}
        </div>
    </div>
  )
}

export default LatestProducts