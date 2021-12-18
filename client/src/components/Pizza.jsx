import React from 'react'

const Pizza = ({ pizza }) => {
    return (
        <div>
            <h1>{pizza.name}</h1>
            <img src={pizza.image} className="img-fluid" style={{width:'200px',height:'200px'}} />

            <div className="flex-container">
                <div className="w-100">
                    <p>Variants</p>
                    <select>
                        {pizza.variants.map(option => {
                            return <option value={option}>{option}</option>
                        })}
                    </select>
                </div>
                <div className="w-100">
                    <p>Quantity</p>
                    <select>
                        {[...Array(10).keys()].map((number, index) => {
                            return <option value={index+1}>{index+1}</option>
                        })}
                    </select>
                </div>
            </div>
        </div>
    )
}

export default Pizza
