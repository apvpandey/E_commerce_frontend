import React from 'react'
import { useState, useEffect } from 'react';
import Header from '../components/Layout/Header';

import { Link } from 'react-router-dom';
import Footer from '../components/Layout/Footer';
import Loading from './Loading';
import { useAuth } from '../context/auth';



const Home = () => {

    const [product, setProduct] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API}/api/v1/auth/getAllProductData`, {
            method: "GET"
        })
            .then(res => res.json())
            .then((data) => {
                console.log(data.data)
                setProduct(data.data)
            })
            .catch(() => <Loading />)
    }, [])

    const handleSearch = async (e) => {

        let key = e.target.value;
        if (key) {
            let result = await fetch(`${process.env.REACT_APP_API}/api/v1/auth/serchProduct/${key}`)
            result = await result.json();

            if (result) {
                console.log(result)
                setProduct(result);
            }
            else {
                setProduct((result) => result.data)
            }
        }
    }
    return (
        <>
            <Header />
            <div style={{ minHeight: "73vh" }} className='text-center'>
                <div className="container">
                    &nbsp;
                    <nav className="navbar bg-body-tertiary ">
                        <div className="container-fluid  "  >
                            <select
                                onChange={handleSearch}
                                placeholder="Select Category"
                                className="form-select form-select-sm"
                            >
                                <option value="">Search</option>
                                <option value="Clothing & Apparel">Clothing & Apparel</option>
                                <option value="Footwear & Shoes"> Footwear & Shoes</option>
                                <option value="Electronics & Gadgets">Electronics & Gadgets</option>
                                <option value="Food"> Food</option>
                                <option value="Sports Products">Sports Products</option>
                            </select>
                        </div>
                    </nav>

                    &nbsp;

                    <div className="container">
                        <div className="row">
                            {product.map(prod => <div className="col-lg-3 col-md-4 mb-5">
                                <div className="text-center">
                                    <Link>
                                        <img src={prod.image} height={200} width={220} alt="" />
                                    </Link>
                                    <br />
                                    <p>{prod.name} &nbsp;<br /><i> Model no is : {prod.model} </i></p>
                                    <p><b>(Price : {prod.price}) </b></p>

                                    <div className='d-grid gap-2 col-6 mx-auto'>
                                        <button type="button" className="btn btn-warning btn-sm disabled">ADD TO CART</button>
                                        <button type="button" className="btn btn-info btn-sm">DETAILS</button>
                                    </div>

                                </div>
                            </div>)}
                        </div>
                    </div >

                </div>
            </div>
            <Footer />
        </>
    )
}

export default Home;