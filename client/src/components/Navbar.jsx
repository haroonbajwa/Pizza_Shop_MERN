import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Navbar = () => {

    const cartState = useSelector(state => state.cartReducer);
    const userState = useSelector(state => state.loginUserReducer);
    const { currentUser } = userState;
    
    return (
        <nav className="navbar navbar-expand-lg shadow-lg p-3 mb-5 bg-body rounded">
            <a className="navbar-brand" href="/">PIZZA CLUB</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto">

                    {currentUser ? (
                        <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          {currentUser.name}
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                          <a className="dropdown-item" href="/">Orders</a>
                          <a className="dropdown-item" href="/">Logout</a>
                        </div>
                      </div>
                        
                        ) : (
                        <li className="nav-item">
                            <a className="nav-link" href="/login">Login</a>
                        </li>
                    )}
                    
                    <li className="nav-item">
                        <a className="nav-link" href="/cart">Cart {cartState.cartItems.length}</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
