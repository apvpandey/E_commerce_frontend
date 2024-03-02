import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { useAuth } from "../context/auth";
import { addToCart, decreaseCartQty, getTotal, removeFromCart } from "../redux/cartSlies";
import { Link } from "react-router-dom";
import img from '../components/image/mobile-payment.jpg'





const Cart = () => {
    const [modal, setModal] = useState(false)
    const dispatch = useDispatch()
    const cart = useSelector((state) => state.cart);

    useEffect(() => {
        dispatch(getTotal());
    }, [cart, dispatch]);


    const handleRemoveFromCart = (cartItem) => {
        dispatch(removeFromCart(cartItem));
    }
    const handleDecreseCart = (cartItem) => {
        dispatch(decreaseCartQty(cartItem));
    }
    const handleIncreseCart = (cartItem) => {
        dispatch(addToCart(cartItem))
    }
    const [auth] = useAuth();

    return (
        <>
            <Header />

            <div>
                {cart.cartItems.length === 0 ? (
                    <div className="text-center mb-50" style={{ minHeight: "73vh" }}>
                        <h1 className="text-center bg-light p-2">
                            {`Hello ${auth?.token && auth?.user?.name}`}
                        </h1>
                        <h2><i>Currently Your Cart is Empty </i></h2>
                        <h1> :( </h1>
                    </div>
                ) : (
                    <div style={{ minHeight: "73vh" }}>
                        &nbsp;
                        <div className="row">
                            <div className="col-md-7">

                                <h5 className="text-center"> CART ITEM</h5><hr />
                                <table className="table text-center">
                                    <tr>
                                        <th>S.No</th>
                                        <th>Product Image</th>
                                        <th>Product Price</th>
                                        <th>Product Quantity</th>
                                        <th>Amount</th>
                                    </tr>
                                    {cart.cartItems?.map((cartItem, index) => (
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td><img src={cartItem.image} height={80} alt="...." /></td>
                                            <td>{cartItem.price}</td>
                                            <td>

                                                <button onClick={() => handleDecreseCart(cartItem)}>-</button>
                                                &nbsp;
                                                {cartItem.cartQuantity}
                                                &nbsp;

                                                <button onClick={() => handleIncreseCart(cartItem)}>+</button>

                                            </td>
                                            <td>{(cartItem.price) * (cartItem.cartQuantity)}/-</td>
                                            <td>
                                                <button
                                                    type="button"
                                                    className="btn btn-primary btn-sm text-dark"
                                                    onClick={() => handleRemoveFromCart(cartItem)}
                                                >
                                                    Remove
                                                </button>
                                            </td>

                                        </tr>
                                    ))}
                                </table>
                            </div>
                            <div className="col-md-5 bg-light">
                                &nbsp;
                                <div>
                                    <h5 className="text-center">ORDER SUMMARY</h5><hr />
                                    <h6><i>Coustomer Name : </i> <i className="text-uppercase">{` ${auth?.token && auth?.user?.name}`}</i></h6>
                                    <h6><i>Contact No :</i><i className="text-uppercase">{` ${auth?.token && auth?.user?.phone}`}</i></h6>
                                    <h6><i>Address :</i><i className="text-uppercase">{` ${auth?.token && auth?.user?.address}`}</i></h6>
                                    <h6><i>State & Zip code :</i><i className="text-uppercase">{` ${auth?.token && auth?.user?.state}`} &nbsp; {` ${auth?.token && auth?.user?.zip}`}</i></h6>
                                    <hr />
                                </div>

                                <table className="table text-center">
                                    <tr className="text-center">
                                        <th>Product</th>
                                        <th>Title</th>
                                        <th>Qty</th>
                                        <th>Price</th>
                                        <th>Total</th>
                                    </tr>
                                    {cart.cartItems?.map((cartItem, index) => (
                                        <tr>
                                            <td>{cartItem.name}</td>
                                            <td>{cartItem.category}</td>
                                            <td>{cartItem.cartQuantity}</td>
                                            <td>{cartItem.price}</td>
                                            <td>{(cartItem.price) * (cartItem.cartQuantity)}</td>

                                        </tr>
                                    ))}

                                </table>
                                <div className="text-center">
                                    <p> <i> Below Shopping RS 499/- Shipping Charges are applicable </i><u>RS 30</u>/-</p>
                                </div>
                                <hr />
                                <div className="row text-right">

                                    <div className="col-md-8">
                                        Total Qty : {cart.cartTotalQuantity}
                                    </div>
                                    <div className="col-md-4">
                                        Grand TOTAL : <h5><b>{(cart.cartTotalAmount > 499) ? cart.cartTotalAmount + 0 : cart.cartTotalAmount + 30}/-</b></h5>
                                    </div>
                                </div>
                                <br />
                                <div class="d-grid gap-2 col-6 mx-auto">
                                    <button class="btn btn-success" type="button" onClick={() => setModal(true)}>CHECK OUT</button>
                                    &nbsp;
                                    <Modal
                                        isOpen={modal}
                                        toggle={() => setModal(!modal)}
                                    >
                                        <ModalHeader
                                            toggle={() => setModal(!modal)}
                                            cssModule={{ 'modal-title': 'w-100 text-center' }}
                                        >
                                            <div>
                                                <h4>PAYMENTS</h4>
                                            </div>
                                        </ModalHeader>
                                        <ModalBody>
                                            <div className="row text-center">
                                                <div className="col-md-4">
                                                    <Link className="nav-link active" id="visa-tab" data-toggle="tab" href="#visa" role="tab" aria-controls="visa" aria-selected="true">
                                                        <img src="https://i.imgur.com/sB4jftM.png" width={80} alt="..." />
                                                    </Link>
                                                </div>
                                                <div className="col-md-4">
                                                    <Link className="nav-link" id="paypal-tab" data-toggle="tab" href="#paypal" role="tab" aria-controls="paypal" aria-selected="false">
                                                        <img src={img} width={75} height={35} alt="..." />
                                                    </Link>
                                                </div>
                                                <div className="col-md-4">
                                                    <Link className="nav-link" id="paypal-tab" data-toggle="tab" href="#paypal" role="tab" aria-controls="paypal" aria-selected="false">
                                                        <img src="https://i.imgur.com/yK7EDD1.png" width={80} alt="..." />
                                                    </Link>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="tab-pane fade show active" id="visa" role="tabpanel" aria-labelledby="visa-tab">
                                                    <div className="mt-4 mx-4">
                                                        <div className="text-center">
                                                            <h5>Card Details</h5>
                                                        </div>
                                                        <div className="form mt-3 mx-2">
                                                            <div className="inputbox">
                                                                <span>Cardholder Name</span>
                                                                <input type="text" name="name" className="form-control" required="required" />
                                                            </div>
                                                            &nbsp;
                                                            <div className="inputbox">
                                                                <span>Card Number</span>
                                                                <input type="text" name="name" min={1} max={999} className="form-control" required="required" />
                                                                <i className="fa fa-eye" />
                                                            </div>
                                                            &nbsp;
                                                            <div className="d-flex flex-row gap-3">
                                                                <div className="inputbox col-md-7">
                                                                    <span>Expiration Date</span>
                                                                    <input type="text" name="name" min={1} max={999} className="form-control" required="required" />
                                                                </div>
                                                                &nbsp;
                                                                <div className="inputbox col-md-4">
                                                                    <span>CVV</span>
                                                                    <input type="text" name="name" min={1} max={999} className="form-control" required="required" />
                                                                </div>
                                                            </div>
                                                            &nbsp;
                                                            <div className="d-grid gap-2 col-6 mx-auto">
                                                                <button
                                                                    className="btn btn-success btn-block">PAY {(cart.cartTotalAmount > 499) ? cart.cartTotalAmount + 0 : cart.cartTotalAmount + 30}
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>

                                            {/* <div>
                                                    <div className="modal fade" 
                                                     data-backdrop="static"
                                                      data-keyboard="false"
                                                       tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                                        <div className="modal-dialog">
                                                            <div className="modal-content">
                                                                <div className="modal-body">
                                                                    <div className="text-right">
                                                                        <i className="fa fa-close close" data-dismiss="modal" />
                                                                    </div>
                                                                    <div className="tabs mt-3">
                                                                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                                                                            <li className="nav-item" role="presentation">
                                                                                <a className="nav-link active" id="visa-tab" data-toggle="tab" href="#visa" role="tab" aria-controls="visa" aria-selected="true">
                                                                                    <img src="https://i.imgur.com/sB4jftM.png" width={80} />
                                                                                </a>
                                                                            </li>
                                                                            <li className="nav-item" role="presentation">
                                                                                <a className="nav-link" id="paypal-tab" data-toggle="tab" href="#paypal" role="tab" aria-controls="paypal" aria-selected="false">
                                                                                    <img src="https://i.imgur.com/yK7EDD1.png" width={80} />
                                                                                </a>
                                                                            </li>
                                                                        </ul>
                                                                        <div className="tab-content" id="myTabContent">
                                                                            <div className="tab-pane fade show active" id="visa" role="tabpanel" aria-labelledby="visa-tab">
                                                                                <div className="mt-4 mx-4">
                                                                                    <div className="text-center">
                                                                                        <h5>Credit card</h5>
                                                                                    </div>
                                                                                    <div className="form mt-3">
                                                                                        <div className="inputbox">
                                                                                            <input type="text" name="name" className="form-control" required="required" /> <span>Cardholder Name</span>
                                                                                        </div>
                                                                                        <div className="inputbox">
                                                                                            <input type="text" name="name" min={1} max={999} className="form-control" required="required" />
                                                                                            <span>Card Number</span>
                                                                                            <i className="fa fa-eye" />
                                                                                        </div>
                                                                                        <div className="d-flex flex-row">
                                                                                            <div className="inputbox">
                                                                                                <input type="text" name="name" min={1} max={999} className="form-control" required="required" />
                                                                                                <span>Expiration Date</span>
                                                                                            </div>
                                                                                            <div className="inputbox"> <input type="text" name="name" min={1} max={999} className="form-control" required="required" />
                                                                                                <span>CVV</span>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="px-5 pay">
                                                                                            <button className="btn btn-success btn-block">Add card</button>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="tab-pane fade" id="paypal" role="tabpanel" aria-labelledby="paypal-tab">
                                                                                <div className="px-5 mt-5">
                                                                                    <div className="inputbox">
                                                                                        <input type="text" name="name" className="form-control" required="required" />
                                                                                        <span>Paypal Email Address</span>
                                                                                    </div>
                                                                                    <div className="pay px-5">
                                                                                        <button className="btn btn-primary btn-block">Add paypal</button>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div> */}
                                        </ModalBody>
                                    </Modal>
                                </div>

                            </div>

                        </div>
                    </div >
                )}
            </div>
            <Footer />
        </>
    )
}
export default Cart;