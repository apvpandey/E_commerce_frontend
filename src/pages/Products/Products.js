import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom/dist';



const Products = () => {
    const navigate = useNavigate();
    const [product, setProduct] = useState([]);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API}/api/v1/auth/getAllProductData`, {
            method: "GET",
        })
            .then(res => res.json())
            .then((data) => {
                console.log(data.data)
                setProduct(data.data)
            })
            .catch(() => toast.error("Loading"))
    }, [])

    const deleteProduct = (id, name, model) => {
        if (window.confirm(`ARE YOU SURE WANT TO DELETE ${name} ${model}`))

            fetch(`${process.env.REACT_APP_API}/api/v1/auth/deleteProduct`, {
                method: "POST",
                crossDomain: true,
                headers: {
                    'Content-Type': 'application/json',
                    Accept: "application/json",
                    "Acess-Control-Allow-Origin": "*"
                },
                body: JSON.stringify({
                    userid: id
                })
            }).then((res) => { console.log(res) })
                .catch((error) => {
                    console.log("error", error)
                })
        navigate('/allProduct')
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

    const handleButtonClick = () => {
        setIsActive(!isActive);
    };


    return (
        <>

            <div className="container " style={{ minHeight: "73vh" }}>
                <div>
                    &nbsp;
                    <h6>SELECT CATEGORY</h6>
                    <form role="search" align="center">
                        <select
                            onChange={handleSearch}
                            placeholder="Select Category"
                            className="form-select form-select-sm"
                        >
                            <option value="Clothing & Apparel">All Products</option>
                            <option value="Clothing & Apparel">Clothing & Apparel</option>
                            <option value="Footwear & Shoes"> Footwear & Shoes</option>
                            <option value="Electronics & Gadgets">Electronics & Gadgets</option>
                            <option value="Food"> Food</option>
                            <option value="Sports Products">Sports Products</option>
                        </select>
                    </form>
                </div>
                <hr />
                <div className="row">
                    {product.map(prod => <div className="card mb-8">
                        <div className="row g-0">
                            <div className="col-md-4" align="center">
                                <img src={prod.image} height={200} width={200} className="img-fluid rounded-start" alt="..." />
                            </div>
                            <div className="col-md-8 bg-secondary-subtle">
                                <div className="card-body">
                                    <h5 className="card-title">{prod.name} {prod.model}</h5>
                                    <p className="card-text"> <b>Product Id :</b> {prod._id}</p>
                                    <p className="card-text"> <b>Category :</b> {prod.category}</p>
                                    <p className="card-text"> <b>Description :</b> {prod.description} <br /> <b>User Price :</b> {prod.price} /- <br /> <b>Stock :</b> {prod.stocks}</p>
                                    <button
                                        className="btn btn-primary btn-sm"
                                        onClick={handleButtonClick}
                                    >
                                        {(prod._id) ? 'BUY' : "OUT OF STOCK"}

                                    </button>
                                    &nbsp;
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => deleteProduct(prod._id, prod.name)}
                                    >
                                        DELETE
                                    </button>
                                    &nbsp;
                                    <button
                                        className="btn btn-warning btn-sm"
                                    >
                                        REORDER
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    )}
                </div>
            </div >
        </>
    )
}

export default Products;
