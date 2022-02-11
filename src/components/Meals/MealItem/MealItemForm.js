import { useRef, useState } from 'react';
import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';

const MealItemForm = (props) => {

    const amountInputRef = useRef();
    const [formIsValid, setFormIsValid] = useState(true);

    const submitHandler = (event) => {
        event.preventDefault();
        
        const enteredAmount = amountInputRef.current.value;
        const numAmount = +enteredAmount;

        if (enteredAmount.trim().length === 0 || numAmount < 1 || numAmount > 5) {
            setFormIsValid(false);
            return;
        } else {
            setFormIsValid(true);
            props.onAddToCart(numAmount);
        }
    }

    return <form className={classes.form} onSubmit={submitHandler}>
        <Input 
            ref={amountInputRef} 
            label='Amount' input={{
            id:'amount_' + props.id,
            type:'number',
            min:'1',
            max:'5',
            step:'1',
            defaultValue:'1'
        }} />
        <button>+ Add</button>
        {!formIsValid && <p>Please enter a valid amount (1-5)</p>}
    </form>
};

export default MealItemForm;