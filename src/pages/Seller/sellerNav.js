import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/auth';
import { toast } from 'react-hot-toast';



const SellerNav = () => {

    const [auth, setAuth] = useAuth();
    const handlelogout = () => {
        setAuth({
            ...auth,
            user: null,
            token: ""
        })
        localStorage.removeItem('auth')
        toast.success("Logout Succesfully")
    }


    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link to="/sellerDisplayProduct" className="navbar-brand">E-Commerce App</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-2">
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    SELLER
                                </Link>
                                <ul className="dropdown-menu">
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" href="#">Profile</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" href="#">Link</Link>
                                    </li>
                                </ul>
                            </li>
                            <Link to="/sellerAddProDashboard"> <button type="button" className="btn btn-primary">ADD PRODUCT</button></Link>
                            <Link to="/sellerLogin"> <button type="button" onClick={handlelogout} className="btn btn-danger">LOGOUT</button></Link>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default SellerNav;
