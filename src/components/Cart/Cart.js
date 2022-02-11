import { useContext } from 'react';
import CartContext from '../../store/cart-context';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartItem from './CartItem';

const Cart = props => {

    const cartContext = useContext(CartContext);
    
    const addItemHandler = (item) => {
        cartContext.addItem({...item, amount: 1});
    }

    const removeItemHandler = (id) => {
        cartContext.removeItem(id);
    }

    const totalAmount = `$${cartContext.totalAmount.toFixed(2)}`;
    const hasItems = cartContext.items.length > 0;
    const cartItems = cartContext.items.map(item => {
        return <CartItem key={item.id} item={item} onAdd={addItemHandler.bind(null, item)} onRemove={removeItemHandler.bind(null, item.id)}/>
    });

    return <Modal onHide={props.onHideCart}>
        <ul className={classes['cart-items']}>
            {cartItems}
        </ul>
        <div className={classes.total}>
            <spam>Total amount</spam>
            <spam>{totalAmount}</spam>
        </div>
        <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={props.onHideCart}>Close</button>
            {hasItems && <button className={classes.button}>Order</button>} 
        </div>
    </Modal>
};

export default Cart;