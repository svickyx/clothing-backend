import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price * 100
    //stripe需要顯示的價錢是cents, not dollars,所以在寫function component裡面要把price從dollars變為cents
    const publicableKey = 'pk_test_51HEC2bLnml1ec3yCjsWx3zHK1Vol1R691v1JzoBAzGc8PeLjtd9CBvGyZl6OlgRURa9xB1Wbh94JKoP8zy7Y1dax00N3XNv4vJ'
    
    const onToken = token => {
        axios({
            url: '/payment',
            method: 'post',
            data: {
                amount: priceForStripe,
                token
            }
        })
        .then(response => {
            alert('payment successful');
        })
        .catch(error => {
            console.log('payment error: ', error);
            alert('there was issue with your payment, please make sure you use the provided credit card.');
        });
    };

    return(
        <StripeCheckout 
            label = 'Pay Now'
            name='Queen Clothing Ltd.'
            billingAddress
            shippingAddress
            image='https://sendeyo.com/up/d/f3eb2117da'
            description={`Your total is ${price}`}
            amount = {priceForStripe}
            panelLabel = 'Pay Now'
            token = {onToken}
            stripeKey = {publicableKey}
        
        />)
}

export default StripeCheckoutButton;