import React from 'react'
import Product from '../../pages/Products/Products'
import SellerNav from './sellerNav'
import Footer from '../../components/Layout/Footer'



const SellerDisplayProduct = () => {

    return (
        <>
            <SellerNav />
            <Product />
            <Footer />
        </>
    )
}

export default SellerDisplayProduct;
