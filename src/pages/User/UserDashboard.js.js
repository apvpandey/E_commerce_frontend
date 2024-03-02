import React, { useState, useEffect } from 'react'

import UserDashboardProduct from './UserDashboardproduct';

import Layout from '../../components/Layout/Layout';

const UserDashboard = () => {
    const [user, setUser] = useState([]);
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API}/api/v1/auth/getAllUser`, {
            method: "GET"
        }).then(res => res.json())
            .then((data) => {
                console.log(data.data)
                setUser(data.data)
            })
            .catch(error => console.log(error));
    }, [])


    return (
        <Layout>
            <UserDashboardProduct />
        </Layout>
    )
}

export default UserDashboard;

