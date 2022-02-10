import Modal from '../UI/Modal';
import classes from './Cart.module.css';

const Cart = props => {
    
    const cartItems = [{id: 'c1', name: 'Sushi', amount: 2, price: 12.99}].map(item => {
        return <li>{item.name}</li>
    });

    return <Modal onHide={props.onHideCart}>
        <ul className={classes['cart-items']}>
            {cartItems}
        </ul>
        <div className={classes.total}>
            <spam>Total amount</spam>
            <spam>28.99</spam>
        </div>
        <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={props.onHideCart}>Close</button>
            <button className={classes.button}>Order</button>
        </div>
    </Modal>
};

export default Cart;