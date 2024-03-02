import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../../components/Layout/Layout'
import toast from 'react-hot-toast';
import axios from "axios";
import { useNavigate } from "react-router-dom"
import { useAuth } from '../../context/auth';

const SellerLogin = () => {

    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [auth, setAuth] = useAuth('')
    const navigate = useNavigate();

    // form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/sellerLogin`,
                { phone, password });

            if (res && res.data.success) {
                (toast.success(res.data.message))
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token
                });
                localStorage.setItem('auth', JSON.stringify(res.data));
                navigate('/sellerDisplayProduct')
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error)
            toast.error("Somthing Went Wrong..")
        }
    };

    return (
        <Layout>
            <div className="container bg-light align-items-center p-3 col-sm-5">
                <div className="card box2 shadow-sm">
                    <div className=" align-items-center justify-content-between p-md-4 p-4">
                        <h3 align="center">SELLER LOGIN PAGE</h3>
                    </div>
                    <form onSubmit={handleSubmit}>

                        <h6>PhoneID<strong className="text-danger">*</strong></h6>
                        <div>
                            <input
                                className="form-control"
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="Enter Your PhoneID"
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
                        <div align="center">
                            <p>
                                if not Register then click..... <Link to="/seller">Register Page</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default SellerLogin;
