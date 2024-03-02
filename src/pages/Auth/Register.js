import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { Link } from "react-router-dom";
import toast from 'react-hot-toast';
import axios from "axios";
import { useNavigate } from "react-router-dom"




const Register = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [password, setPassword] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [zip, setZip] = useState("")
    const navigate = useNavigate();


    // form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`,
                { name, email, password, address, phone, city, state, zip });

            if (res.data.success) {
                toast.success(res.data.message, { autoClose: 3000 })
                navigate('/loginUser')
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
                        <h3 align="center"> USER REGISTRATION FORM</h3>
                    </div>
                    <ul className="nav nav-tabs mb-3 px-md-4 px-2">
                        <li className="nav-item">
                            <Link className="nav-link px-2" to="/loginUser">
                                Login
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link px-2 active" to="/registerUser">
                                Register
                            </Link>
                        </li>
                    </ul>



                    <form className="row g-2" onSubmit={handleSubmit}>
                        <div className="col-md-6">
                            <label className="form-label">Name<strong className="text-danger">*</strong></label>
                            <input
                                className="form-control"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter Your Name"
                                required
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Email<strong className="text-danger">*</strong></label>
                            <input
                                className="form-control"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter Your Email"
                                required
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Password<strong className="text-danger">*</strong></label>
                            <input
                                className="form-control"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter Your Password"
                                required
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Mobile No<strong className="text-danger">*</strong></label>
                            <input
                                className="form-control"
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="Enter Your PhoneNo"
                                required
                            />
                        </div>
                        <div className="col-12">
                            <label className="form-label">Address<strong className="text-danger">*</strong></label>
                            <input
                                className="form-control"
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="Enter Your Address"
                                required
                            />
                        </div>

                        <div className="col-md-4">
                            <label className="form-label">City<strong className="text-danger">*</strong></label>
                            <input
                                className="form-control"
                                type="text"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                placeholder="Enter Your City"
                                required

                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">State<strong className="text-danger">*</strong></label>
                            <input
                                className="form-control"
                                type="text"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                placeholder="Enter Your State"
                                required

                            />

                        </div>
                        <div className="col-md-2">
                            <label className="form-label">Zip Code<strong className="text-danger">*</strong></label>
                            <input
                                className="form-control"
                                type="text"
                                value={zip}
                                onChange={(e) => setZip(e.target.value)}
                                placeholder="Zip"
                                required
                            />
                        </div>

                        <div className="col-12" align="center">
                            <button type="submit" className="btn btn-success">REGISTER</button>
                        </div>
                        <div align="center">
                            <p>
                                Alredy have an account..? <Link to="/loginUser">Login Page</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default Register;
