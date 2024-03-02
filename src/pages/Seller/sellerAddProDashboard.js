import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import SellerHome from "./sellerNav";
import Footer from "../../components/Layout/Footer";






const SellerAddProduct = () => {

    const [name, setName] = useState(" ")
    const [model, setModel] = useState(" ")
    const [image, setImage] = useState(" ")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [stocks, setStokes] = useState("")



    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/productAdding`,
                { name, model, image, description, category, stocks, price });

            if (res.data.success) {
                toast.success(res.data.message, { autoClose: 3000 })

            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error("Somthing Went Wrong..")
        }
        e.target.reset()

    }
    const convertToBase64 = (e) => {
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            setImage(reader.result)
        };
        reader.onerror = error => {
            console.log("error", error);
        }
    }




    return (
        <>
            <SellerHome />
            <div className="container p-3 col-sm-4" style={{ minHeight: "73vh" }}>
                <div className="card box2 shadow-sm">
                    <div className=" align-items-center justify-content-between p-md-4 p-4">
                        <h4 align="center"> ADD PRODUCTS</h4>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div align="center">
                            {image && (
                                <img src={image} style={{ maxWidth: "40%" }} />
                            )}
                            <br />
                            <lable className="form-label"> PRODUCT IMAGE</lable>
                            <input
                                className="form-control"
                                accept="image/"
                                type="file"
                                onChange={convertToBase64}
                            />

                            <lable className="form-label"> PRODUCT NAME</lable>
                            <input
                                className="form-control"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Product name"
                                required

                            />
                            <lable className="form-label"> PRODUCT MODEL</lable>
                            <input
                                className="form-control"
                                type="text"
                                value={model}
                                onChange={(e) => setModel(e.target.value)}
                                placeholder="Product Model"
                                required

                            />
                            <lable className="form-label">PRICE</lable>
                            <input
                                className="form-control"
                                type="text"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder="Product Price"
                                required
                            />
                            <lable className="form-label"> DESCRIPTION</lable>
                            <input
                                className="form-control"
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Product Description"
                                required
                            />

                            <lable className="form-label"> CATEGORY</lable>
                            <br />
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="form-control"
                                placeholder="Select Category"
                            >
                                <option></option>
                                <option value="Clothing & Apparel">Clothing & Apparel</option>
                                <option value="Footwear & Shoes"> Footwear & Shoes</option>
                                <option value="Electronics & Gadgets">Electronics & Gadgets</option>
                                <option value="Food"> Food</option>
                                <option value="Sports Products">Sports Products</option>
                            </select>

                            <lable className="form-label"> STOCKS</lable>
                            <input
                                className="form-control"
                                type="text"
                                value={stocks}
                                onChange={(e) => setStokes(e.target.value)}
                                placeholder="Stokes"
                                required

                            />
                        </div>

                        <button type="submit" className="btn btn-success" align="center">
                            ADD PRODUCTS
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    )
}
export default SellerAddProduct;