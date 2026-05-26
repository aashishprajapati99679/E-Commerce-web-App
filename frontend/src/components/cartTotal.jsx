import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from './Title';

const cartTotal = () => {
    const { currency, delivery_fee, getTotalCartAmount } = useContext(ShopContext);


    return (
        <div className='w-full'>
            <div className='text-2xl font-semibold'>
                <Title text1={'CART'} text2={'TOTAL'} />
            </div>
            <div className='flex flex-col gap2 nt-2 text-sm mt-6'>
                <div className='flex justify-between'>
                    <p>SubTotal</p>
                    <p>{currency}{getTotalCartAmount()}.00</p>
                </div>
                <hr />
                <div className='flex justify-between mt-3'>
                    <p>Shipping Fees</p>
                    <p>{currency}{delivery_fee}.00</p>
                </div>
                <hr />
                <div className='flex justify-between mt-3'>
                    <b>Total</b>
                    <b>{currency} {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + delivery_fee}.00</b>
                </div>
            </div>

        </div>
    )
}

export default cartTotal