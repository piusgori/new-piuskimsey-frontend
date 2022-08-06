import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ActivityIndicator from '../../../components/ui/ActivityIndicator';
import Card from '../../../components/ui/Card';
import { AppContext } from '../../../services/app-context';
import classes from './PersonComponent.module.css';

const PersonComponent = () => {

    const { isLoading, getProductsByAdminId, setIsModalVisible, setModalAnimation, setModalButtonText, setModalRoute, setModalText, setModalTitle} = useContext(AppContext);
    const { personId } = useParams();
    const [products, setProducts] = useState([]);
    const [name, setName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const gettingProductsHandler = async () => {
            try {
                const data = await getProductsByAdminId(personId);
                if(data.content){
                    for (const i of data.content){
                        if(i.type === 'Admin'){
                            setModalTitle('Not existing');
                            setModalAnimation(2);
                            setModalText(i.message);
                            setModalButtonText('Try Again Later');
                            setModalRoute(null);
                            setIsModalVisible(true);
                        }
                    }
                    return;
                }
                setProducts(data.products);
                setName(data.name);
            } catch (err) {
                setModalAnimation(3);
                setModalButtonText('Okay');
                setModalRoute('/');
                setModalText('An Unexpected Error has occured');
                setModalTitle('We are sorry');
                setIsModalVisible(true);
            }
        }
        if(!personId){
            return navigate('/');
        } else {
            gettingProductsHandler();
        }
        //eslint-disable-next-line
    }, [personId]);

    if(!personId){
        return (
            <div className={classes.container}>
                <h1 className={classes.title}>Products</h1>
                <p className={classes.emptyText}>No Admin has been selected</p>
            </div>
        )
    }

  return (
    <div className={classes.container}>
        {isLoading && <ActivityIndicator></ActivityIndicator>}
        {!isLoading && <div>
            <h1 className={classes.title}>Products for {name}</h1>
            {products.length === 0 && <p className={classes.emptyText}>This person has not added any products yet</p>}
            {products.length > 0 && <div className={classes.productsContainer}>
                {products.map((prod) => <Card key={prod.id} product={prod}></Card>)}
            </div>}
        </div>}
    </div>
  )
}

export default PersonComponent