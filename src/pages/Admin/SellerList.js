import React, { useEffect, useState } from 'react'
import AdminNav from './AdminNav';
import Footer from '../../components/Layout/Footer';



const SellerList = () => {

    const [seller, setSeller] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API}/api/v1/auth/getAllSeller`, {
            method: "GET"
        }).then(res => res.json())
            .then((data) => {
                console.log(data.data)
                setSeller(data.data)
            })
            .catch(error => console.log(error));
    }, [])


    return (

        <>
            <AdminNav />
            <div style={{ minHeight: "73vh" }} >

                <div >
                    &nbsp;
                    <form role="search" align="center">
                        <input
                            type="search"
                            placeholder="Search User Name"
                            aria-label="Search"
                        // onChange={handleSearch}

                        />
                    </form>
                </div>
                <hr />
                <div align="center" className='container'>
                    <table className="table table-striped" >
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Seller ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className="table-group-divider">
                            {seller.map((item, index) => (
                                <tr key={item._id}>
                                    <td>{index + 1}</td>
                                    <td>{item._id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.phone}</td>
                                    <td>
                                        {/* <Link to={`/update/${item._id}`} className="btn" >Edit</Link> <br /> */}
                                        {/* <Link to={`/students/${item._id}/edit`} className="btn" >Edit</Link> <br /> */}

                                        <button
                                        // onClick={() => updateUser(item._id)}
                                        >Edit</button>
                                        <button
                                        //  onClick={() => deleteUser(item._id, item.name)}
                                        >Delete</button>

                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />
        </>

    )

}
export default SellerList;