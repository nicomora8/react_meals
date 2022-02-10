import { useReducer } from 'react';
import CartContext from './cart-context';

const CartProvider = props => {

    const defaultCartState = {
        items: [],
        totalAmount: 0
    };

    const cartReducer = (state, action) => {
        if (action.type === 'NEW_ITEM') {
            const updatedItems = state.items.concat(action.item);
            const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
            return {items: updatedItems, totalAmount: updatedTotalAmount};
        }
        if (action.type === 'REMOVE_ITEM') {
                state.items.filter((item) => {
                return item.id !== action.id;
            });
        }
    };
    
    const[cartState, dispatchCart] = useReducer(cartReducer, defaultCartState);

    const addItemToCartHandler = (item) => {
        dispatchCart({type: 'NEW_ITEM', item: item});
    };

    const removeItemFromCartHandler = (id) => {
        dispatchCart({type: 'REMOVE_ITEM', id: id});
    };

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler
    };

    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
};

export default CartProvider;