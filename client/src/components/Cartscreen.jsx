import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, deleteFromCart } from '../actions/cartActions';

const Cartscreen = () => {

    const cartState = useSelector(state => state.cartReducer);
    const cartItems = cartState.cartItems;

    const dispatch = useDispatch();

    return (
        <div>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h2 style={{fontSize:"40px"}}>My Cart</h2>

                    {cartItems.map((item) => {
                        return <div className="flex-container">
                            <div className="text-start m-1 w-100">
                                <h1>{item.name} [{item.variant}]</h1>
                                <h1>Price: {item.quantity} * {item.prices[0][item.variant]} = {item.price}</h1>
                                <h1 style={{display: 'inline'}}>Quantity: </h1>
                                <i className="fa fa-minus text-danger m-2" aria-hidden="true" onClick={() => {dispatch(addToCart(item, item.quantity-1, item.variant))}}></i>
                                <b style={{fontSize:'20px'}}>{item.quantity}</b>
                                <i className="fa fa-plus text-success m-2" aria-hidden="true" onClick={() => {dispatch(addToCart(item, item.quantity+1, item.variant))}}></i>
                                <hr />
                            </div>
                            <div m-1 w-100>
                                <img src={item.image} alt="pizza" style={{height:'80px', width:'80px'}} />
                            </div>
                            <div m-1 w-100>
                                <i className="fa fa-trash text-danger m-2" aria-hidden="true" onClick={() => dispatch(deleteFromCart(item))}></i>
                            </div>
                        </div>
                    })}
                    
                </div>
                <div className="col-md-4"></div>
            </div>
            
        </div>
    )
}

export default Cartscreen
