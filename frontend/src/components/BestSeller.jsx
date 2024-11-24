import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {

    const titleProps = { text1: 'BEST', text2: 'SELLERS' };
    const { products } = useContext(ShopContext);
    const [bestSeller, setBestSeller] = useState([]);

    useEffect(() => {
        if (products) { // Check if products is defined
            const bestProducts = products.filter((item) => item.bestseller);
            setBestSeller(bestProducts.slice(0, 5));
        }
    }, [products]);


  return (
    <div className='my-10'>
        <div className='text-center text-3xl py-8'>
        <Title {...titleProps}/>
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-700'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et adipisci exercitationem id rerum optio.</p>
        </div>
        {/*Rendring Products */}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {bestSeller && bestSeller.length > 0 ? (
                    bestSeller.map((item) => (
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

export default BestSeller