import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { toast } from "react-hot-toast";


const AdminNav = () => {

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
            <nav className="navbar navbar-expand-lg bg-body-tertiary gap-5">
                <div className="container-fluid">
                    <Link to="/allProduct" className="navbar-brand" > E-Commerce App</Link>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-5 mb-lg-0 ">
                            {
                                !auth.user ? (<>
                                    <li className="nav-item">
                                        <Link to="/" className="nav-link " aria-current="page">HOME</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/category" className="nav-link " aria-current="page">CATEGORY</Link>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <Link className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
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
                                        <Link to="/userDashboardlist" className="nav-link " aria-current="page">USER</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/sellerList" className="nav-link " aria-current="page">SELLER</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/allProduct" className="nav-link " aria-current="page">PRODUCTS</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="#" className="nav-link " aria-current="page">TOTAL ORDER</Link>
                                    </li>

                                    <li className="nav-item dropdown">
                                        <Link className="nav-link dropdown-toggle text-uppercase" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            {auth?.user?.name}
                                        </Link>
                                        <ul className="dropdown-menu">
                                            <li className="nav-item">
                                                <Link to="/adminLogin" className="dropdown-item" onClick={handlelogout}>LOGOUT</Link>
                                            </li>
                                        </ul>
                                    </li>
                                </>)
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}
export default AdminNav