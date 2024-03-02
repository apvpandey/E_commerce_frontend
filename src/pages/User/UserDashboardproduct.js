import React from 'react'
import { useState, useEffect } from 'react';
import { useDispatch } from "react-redux"
import { showDetail, addToCart, removeShowDetail } from '../../redux/cartSlies';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { model } from 'mongoose';
import { useSelector } from "react-redux";





const UserDashboardProduct = () => {

    const cart = useSelector((state) => state.cart);
    const params = useParams();
    const [product, setProduct] = useState([]);
    const [modal, setModal] = useState(false);
    const [selectDetail, setSelectDetail] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API}/api/v1/auth/getAllProductData`, {
            method: "GET"
        })
            .then(res => res.json())
            .then((data) => {
                console.log(data.data)
                setProduct(data.data)
            })
            .catch(() => alert("Loading"))
        // handleDetail();
    }, [])

    const handleAddToCart = (event) => {
        dispatch(addToCart(event));
        navigate('/cart')
    }


    const handleRemoveDetail = (detailsItems) => {
        dispatch(removeShowDetail(detailsItems));
        setModal(!modal)
    }

    const handleAddToCartFromDetail = (prod) => {
        dispatch(addToCart(prod));
        dispatch(removeShowDetail(prod));
        setModal(!modal)

    }

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

    const handleDetail = (prod) => {
        dispatch(showDetail(prod));
        setModal(true)
    }



    return (
        <>
            <div className="container">
                &nbsp;

                <nav className="navbar bg-body-tertiary">
                    <div className="container-fluid"  >
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

                <div className="row">
                    {product.map(prod => <div key={prod._id} className="col-lg-4 col-md-4">
                        <div className="text-center">
                            <Link>
                                <img src={prod.image} height={200} width={220} alt="..." />
                            </Link>
                            <br />
                            <p>{prod.name} &nbsp;<br /><i> Model no is : {prod.model} </i></p>
                            <p><b>(Price : {prod.price}) </b></p>
                            <div className='d-grid gap-2 col-6 mx-auto'>
                                <button className="btn btn-warning btn-sm"
                                    onClick={() => handleAddToCart(prod)}
                                >
                                    ADD TO CART
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-info btn-sm"
                                    onClick={() => handleDetail(prod)}>
                                    DETAILS
                                </button>
                            </div>
                        </div>

                        &nbsp;
                    </div>)}
                    <div>
                        <Modal
                            isOpen={modal}
                        >
                            <div className="row">
                                {cart.detailsItems?.map(prod => <div className="card mb-8">
                                    <div className="row g-0">
                                        <div className="col-md-0">
                                            <div className="card-body">
                                                <div>
                                                    <img src={prod.image} height={200} width={200} className="img-fluid rounded-start" alt="..." />
                                                </div>

                                                <h5 className="card-title">{prod.name} {prod.model}</h5>
                                                <p className="card-text"> <b>Product Id :</b> {prod._id}</p>
                                                <p className="card-text"> <b>Category :</b> {prod.category}</p>
                                                <p className="card-text"> <b>Description :</b> {prod.description} <br /> <b>User Price :</b> {prod.price} /- <br /></p>
                                            </div>
                                        </div>
                                        <div>
                                            <button className="btn btn-danger btn-sm"
                                                onClick={() => handleRemoveDetail(prod)}
                                            >
                                                BACK
                                            </button>
                                            <button className="btn btn-warning btn-sm"
                                                onClick={() => handleAddToCartFromDetail(prod)}
                                            >
                                                ADD TO CART
                                            </button>
                                        </div>

                                    </div>
                                </div>
                                )}
                            </div>
                        </Modal>
                    </div >
                </div >

            </div >

        </>
    )
}

export default UserDashboardProduct;