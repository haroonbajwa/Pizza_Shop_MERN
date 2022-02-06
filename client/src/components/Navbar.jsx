import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Navbar = () => {

    const cartState = useSelector(state => state.cartReducer);
    
    return (
        <nav className="navbar navbar-expand-lg shadow-lg p-3 mb-5 bg-body rounded">
            <a className="navbar-brand" href="/">PIZZA CLUB</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="/login">Login</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/cart">Cart {cartState.cartItems.length}</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
