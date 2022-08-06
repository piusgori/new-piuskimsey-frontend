import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from '../../../components/ui/Card';
import { AppContext } from '../../../services/app-context';
import { title } from '../../../utils/title';
import classes from './CategoryProducts.module.css';

const CategoryProducts = () => {

    const { products, categories } = useContext(AppContext);
    const { cat } = useParams();
    const [selectedCategory, setSelectedCategory] = useState('');
    const [isFilterLoading, setIsFilterLoading] = useState(true);
    const [selectedFilter, setSelectedFilter] = useState('Price');

    useEffect(() => {
        let categoryName;
        if(cat.includes('-')){
            categoryName = cat.split('-')[0];
        } else {
            categoryName = cat;
        }
        const regExp = new RegExp(`${categoryName}`, 'i');
        for (const i of categories){
            const isPresent = regExp.test(i.title);
            if(!!isPresent){
                setSelectedCategory(i.title);
                title(i.title);
            }
        }
        setIsFilterLoading(false);

    }, [cat, products, categories])


  return (
    <div className={classes.container}>
        <div className={classes.spacingContainer}></div>
        <div className={classes.headerContainer}>
            <p className={classes.headerTitle}>{selectedCategory}</p>
            <div className={classes.headerFilterContainer}>
                <p className={classes.headerTitle}>Sort By: </p>
                <select onChange={(event) => {setSelectedFilter(event.target.value)} } className={classes.headerSelect}>
                    <option>Price</option>
                    <option>Date Added</option>
                </select>
            </div>
        </div>
        <div className={classes.spacingContainer}></div>
        {!isFilterLoading && <div>
            {products.filter(prod => prod.category === selectedCategory).length === 0 && <p className={classes.emptyText}> There no products for this category yet</p>}
            {products.filter(prod => prod.category === selectedCategory).length > 0 && <div className={classes.productsContainer}>
                {selectedFilter === 'Price' && products.filter(prod => prod.category === selectedCategory).sort((a, b) => b.price - a.price).map((product) => <Card key={product.id} product={product}></Card>)}
                {selectedFilter === 'Date Added' && products.filter(prod => prod.category === selectedCategory).sort((a, b) => (new Date(b.createdAt).getTime()) - (new Date(a.createdAt).getTime())).map((product) => <Card key={product.id} product={product}></Card>)}
            </div>}
        </div>}
        {isFilterLoading && <p className={classes.emptyText}>Loading...</p>}
        <div className={classes.spacingContainer}></div>
    </div>
  )
}

export default CategoryProducts;