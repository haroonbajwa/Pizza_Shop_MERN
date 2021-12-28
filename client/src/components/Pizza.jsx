import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addToCart } from '../actions/cartActions';

import { Modal, Button } from 'react-bootstrap';

const Pizza = ({ pizza }) => {

    const dispatch = useDispatch();

    const [quantity, setQuantity] = useState(1);
    const [variant, setVariant] = useState('small');

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const addToCartFunc = () => {
        dispatch(addToCart(pizza, quantity, variant));
    }

    return (
        <div className="m-5 shadow-lg p-3 mb-5 bg-white rounded">
            <div onClick={handleShow} style={{cursor:'pointer'}}>
                <h1>{pizza.name}</h1>
                <img src={pizza.image} alt="pizza" className="img-fluid" style={{width:'200px',height:'200px'}} />
            </div>

            <div className="flex-container mt-3">
                <div className="w-100 m-1">
                    <p className="m-1">Variants</p>
                    <select className="form-control" value={variant} onChange={(e) => {setVariant(e.target.value)}}>
                        {pizza.variants.map(option => {
                            return <option value={option}>{option}</option>
                        })}
                    </select>
                </div>
                <div className="w-100 m-1">
                    <p className="m-1">Quantity</p>
                    <select className="form-control" value={quantity} onChange={(e) => {setQuantity(e.target.value)}}>
                        {[...Array(10).keys()].map((number, index) => {
                            return <option value={index+1} key={index}>{index+1}</option>
                        })}
                    </select>
                </div>
            </div>
            
            <div className="flex-container mt-3 align-items-center">
                <div className="m-1 w-100">
                    <h1>Price: {pizza.prices[0][variant] * quantity} Rs/-</h1>
                </div>
                <div className="m-1 w-100">
                    <button className="btn btn-danger" onClick={addToCartFunc}>ADD TO CART</button>
                </div>
            </div>

            <div>
                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                    <Modal.Title>{pizza.name}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                    <img src={pizza.image} alt="pizza" className="img-fluid rounded mx-auto d-block" style={{height:'300px'}} />
                    <h5 className="mt-3">Description</h5>
                    <p>{pizza.description}</p>
                    </Modal.Body>

                    <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    )
}

export default Pizza
