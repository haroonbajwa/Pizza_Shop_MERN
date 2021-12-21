import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllPizzas } from '../actions/pizzaActions'
import pizzas from '../4.1 pizzasdata';
import Pizza from './Pizza';

const Homescreen = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllPizzas());
    }, [])

    return (
        <div>
            <div className="row">
                {
                    pizzas.map(pizza => {
                        return <div className="col-md-4">
                            <div>
                                <Pizza pizza={pizza} />
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default Homescreen
