import React from 'react'

import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const ProductDetails = () => {

    const [show, setShow] = useState(false);

    const handleShow = () => {

    }

    return (
        <>
            <Header />
            <div class="modal-body" onClick={handleShow}>
                <h2 class="fs-5">Popover in a modal</h2>
                <p>This <button class="btn btn-secondary" data-bs-toggle="popover" title="Popover title" data-bs-content="Popover body content is set in this attribute.">button</button> triggers a popover on click.</p>
                <hr />
                <h2 class="fs-5">Tooltips in a modal</h2>
                <p><Link href="#" data-bs-toggle="tooltip" title="Tooltip">This link</Link> and <Link href="#" data-bs-toggle="tooltip" title="Tooltip">that link</Link> have tooltips on hover.</p>
            </div>

            <Footer />
        </>
    )
}

export default ProductDetails

