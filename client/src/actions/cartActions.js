export const addToCart = (pizza, quantity, variant) => (dispatch, getState) => {


    var cartItem = {
        name: pizza.name,
        _id: pizza._id,
        image: pizza.image,
        variant: variant,
        quantity: quantity,
        prices: pizza.prices,
        price: pizza.prices[0][variant] * quantity
    }

    dispatch({ type: 'ADD_TO_CART', payload: cartItem });

    const cartItems = getState().cartReducer.cartItems;
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

}