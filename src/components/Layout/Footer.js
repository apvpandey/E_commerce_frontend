import React from 'react'
import { Link } from "react-router-dom"

const Footer = () => {
    return (
        <div className='bg-dark text-light p-3'>
            <h4 className='text-center'> All Right Reserve &copy; Eynosoft Pvt Ltd </h4>
            <div align="center">
                <Link to="/about" className="nav-link active" aria-current="page" >About</Link>
                <Link to="/contact" className="nav-link active" aria-current="page" >Contact</Link>
                <Link to="/policy" className="nav-link active" aria-current="page" >Private Policy</Link>
            </div>
        </div>
    )
}
export default Footer
