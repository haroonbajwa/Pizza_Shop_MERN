import React from 'react'
import pizzas from '../4.1 pizzasdata';
import Pizza from './Pizza';

const Homescreen = () => {
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
