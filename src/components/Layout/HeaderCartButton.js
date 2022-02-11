import React, { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {

    const cartContext = useContext(CartContext);
    const [buttonIsHighlighted, setButtonIsHighlighted] = useState(false);
    const {items} = cartContext;

    useEffect(() => {
        if (items.length === 0){
            return;
        }
        setButtonIsHighlighted(true);
        const timer = setTimeout(() => {
            setButtonIsHighlighted(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        };

    }, [items]);

    const itemCount = items.reduce((currentNum, item) => {
        return currentNum + item.amount;
    }, 0);

    const buttonClasses = `${classes.button} ${buttonIsHighlighted ? classes.bump : ''}`;

    return <button className={buttonClasses} onClick={props.onClick}>
        <span className={classes.icon}>
            <CartIcon/>
        </span>
        <span>Your Cart</span>
        <span className={classes.badge}>{itemCount}</span>
    </button>
}

export default HeaderCartButton;