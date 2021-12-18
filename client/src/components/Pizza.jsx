import React, { useState } from 'react'

const Pizza = ({ pizza }) => {

    const [quantity, setQuantity] = useState(1);
    const [variant, setVariant] = useState('small');

    return (
        <div className="m-5 shadow-lg p-3 mb-5 bg-white rounded">
            <h1>{pizza.name}</h1>
            <img src={pizza.image} className="img-fluid" style={{width:'200px',height:'200px'}} />

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
                            return <option value={index+1}>{index+1}</option>
                        })}
                    </select>
                </div>
            </div>
            
            <div className="flex-container mt-3 align-items-center">
                <div className="m-1 w-100">
                    <h1>Price: {pizza.prices[0][variant] * quantity} Rs/-</h1>
                </div>
                <div className="m-1 w-100">
                    <button className="btn btn-danger">ADD TO CART</button>
                </div>
            </div>
        </div>
    )
}

export default Pizza
