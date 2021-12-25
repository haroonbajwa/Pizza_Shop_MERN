import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllPizzas } from '../actions/pizzaActions';
import Pizza from './Pizza';

const Homescreen = () => {

    const dispatch = useDispatch();

    const pizzasState =  useSelector(state => state.getAllPizzasReducer);
    const { pizzas, error, loading } = pizzasState;

    useEffect(() => {
        dispatch(getAllPizzas());
    }, [])

    return (
        <div>
            <div className="row">

                { loading ? (<h1 className="text-info">Loading...</h1>) : error ? (<h1 className="text-danger">Oops! Something went wrong.</h1>) : (
                    pizzas?.map(pizza => {
                        return <div className="col-md-4" key={pizza._id}>
                            <div>
                                <Pizza pizza={pizza} />
                            </div>
                        </div>
                    })
                )}

            </div>
        </div>
    )
}

export default Homescreen
