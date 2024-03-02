import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { Link } from "react-router-dom";
import toast from 'react-hot-toast';
import axios from "axios";
import { useNavigate } from "react-router-dom"

const SellerRegister = () => {
    const [phone, setPhone] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();


    // form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/sellerRegister`,
                { phone, name, email, password });

            if (res.data.success) {
                toast.success(res.data.message, { autoClose: 3000 })
                navigate('/sellerLogin')
            } else {
                toast.error(res.data.message);
            }

        } catch (error) {
            console.log(error)
            toast.error("Somthing Went Wrong..")
        }
    };
    console.log(process.env.REACT_APP_API);
    return (
        <Layout title="Register - Ecommerce App">
            <div className="container bg-light align-items-center p-3 col-sm-5">
                <div className="card box2 shadow-sm">
                    <div className=" align-items-center justify-content-between p-md-4 p-4">
                        <h3 align="center">SELLER REGISTER</h3>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <h6>PhoneID<strong className="text-danger">*</strong></h6>
                        <div>
                            <input
                                className="form-control"
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="Enter Your PhoneNo"

                            />
                        </div>
                        <h6>Name<strong className="text-danger">*</strong></h6>
                        <div>
                            <input
                                className="form-control"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter Your Name"
                                required
                            />
                        </div>
                        <h6>Email <strong className="text-danger">*</strong></h6>
                        <div>
                            <input
                                className="form-control"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter Your Email"
                                required
                            />
                        </div>
                        <div>
                            <h6> Password <strong className="text-danger">*</strong></h6>
                            <div>
                                <input
                                    className="form-control"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter Your Password"
                                    required
                                />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                        <div align="center">
                            <p>
                                Already Register then click..... <Link to="/sellerLogin">Seller Login</Link>
                            </p>
                        </div>

                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default SellerRegister;
