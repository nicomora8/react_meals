import { useReducer } from 'react';
import CartContext from './cart-context';

const CartProvider = props => {

    const defaultCartState = {
        items: [],
        totalAmount: 0
    };

    const cartReducer = (state, action) => {
        if (action.type === 'NEW_ITEM') {
            const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;

            const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id);
            const existingCartItem = state.items[existingCartItemIndex];

            let updatedItems;
            if (existingCartItem) {
                const updatedItem = {
                    ...existingCartItem,
                    amount: existingCartItem.amount + action.item.amount
                };
                updatedItems = [...state.items];
                updatedItems[existingCartItemIndex] = updatedItem;
            } else {
                updatedItems = state.items.concat(action.item);
            }

            return {items: updatedItems, totalAmount: updatedTotalAmount};
        }
        if (action.type === 'REMOVE_ITEM') {

            const existingCartItemIndex = state.items.findIndex(item => item.id === action.id);
            const existingCartItem = state.items[existingCartItemIndex];
            const updatedTotalAmount = state.totalAmount - existingCartItem.price; 
            let updatedItems = [...state.items];
            // Si es el último, lo borro
            if (existingCartItem.amount === 1) {
                updatedItems.splice(existingCartItemIndex, 1);
            } else {
                let updatedItem = {...existingCartItem, amount: existingCartItem.amount - 1};
                updatedItems[existingCartItemIndex] = updatedItem;
            }

            return {items: updatedItems, totalAmount: updatedTotalAmount};
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