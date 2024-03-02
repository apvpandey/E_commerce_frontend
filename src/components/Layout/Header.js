import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/auth'
import { toast } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import cartlogo from '../image/cart-image2.png'


const Header = () => {

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

    const { cartTotalQuantity } = useSelector(state => state.cart)



    return <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary ">
            <div className="container-fluid ">
                <Link to="#" className="navbar-brand" > E-Commerce App</Link>

                <div className="collapse navbar-collapse " id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-5 mb-lg-0 gap-4 ">
                        {
                            !auth.user ? (<>
                                <li className="nav-item">
                                    <Link to="/" className="nav-link " aria-current="page">HOME</Link>
                                </li>
                                <li className="nav-item dropdown">
                                    <Link className="nav-link dropdown-toggle " role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        REGISTER/LOGIN
                                    </Link>
                                    <ul className="dropdown-menu">
                                        <li><Link to="/registerUser" className="dropdown-item" >USER</Link></li>
                                        <li><Link to="/adminLogin" className="dropdown-item" >ADMIN</Link></li>
                                        <li><Link to="/seller" className="dropdown-item" >SELLER</Link></li>
                                    </ul>
                                </li>
                            </>) : (<>
                                <li className="nav-item">
                                    <Link to="/userDashboard" className="nav-link " aria-current="page">DASHBOARD</Link>
                                </li>
                                <li className="nav-item dropdown">
                                    <Link className="nav-link dropdown-toggle text-uppercase" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        {auth?.user?.name}
                                    </Link>
                                    <ul className="dropdown-menu">

                                        <li><Link to="" className="dropdown-item" >YOUR ORDER</Link></li>
                                        <li className="nav-item">
                                            <Link to="/loginUser" className="dropdown-item" onClick={handlelogout}>LOGOUT</Link>
                                        </li>
                                    </ul>
                                </li>

                                <li className="nav-item">

                                    <Link
                                        to="/cart"
                                        className="nav-link active"
                                        aria-current="page"
                                    >
                                        <img src={cartlogo} height={25} width={32} alt="..." />
                                    </Link>
                                    <span className="position-absolute top-1 start-96 translate-middle badge rounded-pill bg-danger">
                                        {cartTotalQuantity}
                                        <span className="visually-hidden">unread messages</span>
                                    </span>

                                </li>
                            </>)
                        }
                    </ul>

                </div>
            </div>
        </nav>
    </>
}

export default Header;
