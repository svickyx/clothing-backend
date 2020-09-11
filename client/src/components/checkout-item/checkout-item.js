import React from 'react';

import {connect} from 'react-redux';

import {clearItemFromCart, removeItemFromCart, addCartItem} from '../../redux/cart/cart-action';

import '../checkout-item/checkout-item.scss';

const CheckoutItem = ({cartItem, clearItem, removeItem, addItem })=> {
    const {name, quantity, price, imageUrl} = cartItem;
    //     const {name, quantity, price, imageUrl} = {cartItem}; 錯誤的寫法
    return(
        <div className='checkout-item'>
            <div className='image-container'>
                <img src={imageUrl} alt='item' />
            </div>
            <span className='name'>{name}</span>
            <span className='quantity'>
                <div className='arrow' onClick = {()=> removeItem(cartItem)}>&#10094;</div>
                <span className='value'>{quantity}</span>
                <div className='arrow' onClick = {()=> addItem(cartItem)}>&#10095;</div>
            </span>
            <span className='price'>{price}</span>
            <div className='remove-button' onClick = {()=> clearItem(cartItem)}>&#10005;</div>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    clearItem: item => dispatch(clearItemFromCart(item)),
    removeItem: item => dispatch(removeItemFromCart(item)),
    addItem: item => dispatch(addCartItem(item))
})

//錯誤：這個map裡clearItem接收到的還是item,不是cartItem


export default connect(null, mapDispatchToProps)(CheckoutItem);