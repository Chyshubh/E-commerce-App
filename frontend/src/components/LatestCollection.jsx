import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {

    const [latestProduct, setLatestProduct] = useState([]);
    const titleProps = { text1: 'LATEST', text2: 'COLLECTIONS' };
    const { products } = useContext(ShopContext);

    useEffect(() => {
        setLatestProduct(products.slice(0, 10));
    }, [products])

    return (
        <div className='my-10'>
            <div className='text-center py-8 text-3xl'>
                <Title {...titleProps} />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus, quia? Rem quibusdam quis error.
                </p>
            </div>
            {/*Rendring Products */}
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {latestProduct && latestProduct.length > 0 ? (
                    latestProduct.map((item) => (
                        <ProductItem
                            key={item._id} // Use item._id for a unique key
                            id={item._id}
                            image={item.image}
                            name={item.name}
                            price={item.price}
                        />
                    ))
                ) : (
                    <p>No products available.</p> // Optional: Display a message if no products are found
                )}
            </div>
        </div>
    )
}

export default LatestCollection