import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Spinner = () => {
    const [count, setCount] = useState(3)
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prevValue) => --prevValue);
        }, 1000);
        count === 0 && navigate("/HomeWebSitePage")
        return () => clearInterval(interval)
    }, [count, navigate])
    return (
        <>
            <div className=" aligh-items-center" >
                <h1 className='text-center'>Please Login </h1> <br />
                <h2 className='text-center'>You are Redirecting {count} second</h2>
                <br />
            </div>
        </>
    )
}

export default Spinner;
