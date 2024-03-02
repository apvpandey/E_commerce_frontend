import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../../components/Layout/Layout'
import toast from 'react-hot-toast';
import axios from "axios";
import { useNavigate } from "react-router-dom"
import { useAuth } from '../../context/auth';
import AdminNav from '../Admin/AdminNav';
import Footer from '../../components/Layout/Footer';

const AdminLogin = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();

    // form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/adminLogin`,
                { email, password });

            if (res && res.data.success) {
                (toast.success(res.data && res.data.message));
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token
                });
                localStorage.setItem('auth', JSON.stringify(res.data));
                navigate('/adminDashboard')
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error)
            toast.error("Somthing Went Wrong..")
        }
    };

    return (
        <>
            <AdminNav />
            <div className="container bg-light align-items-center p-3 col-sm-5">
                <div className="card box2 shadow-sm">
                    <div className=" align-items-center justify-content-between p-md-4 p-4">
                        <h3 align="center"> ADMIN LOGIN PAGE</h3>
                    </div>
                    <ul className="nav nav-tabs mb-3 px-md-4 px-2">
                        <li className="nav-item">
                            <Link className="nav-link px-2 active" to="/adminLogin">
                                Login
                            </Link>
                        </li>
                    </ul>
                    <form onSubmit={handleSubmit}>

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

                        <button type="submit" className="btn btn-primary">
                            Login
                        </button>
                    </form>
                </div>
            </div>

        </>
    )
}

export default AdminLogin;
