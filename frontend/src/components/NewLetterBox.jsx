import React, { useState } from 'react'

const NewLetterBox = () => {

    const [email, setEmail] = useState('');

    const onSuubmitHandler = (event) => {
        event.preventDefault();

        setEmail('');
    }

    return (
        <div className='text-center'>
            <p className='text-2xl font-medium text-gray-800 '>Subscribe Now to get 20% off </p>

            <p className='text-gray-400 mt-3'>
                Receive exclusive offers and discounts directly to your inbox
            </p>


            <form onSubmit={onSuubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border border-gray-300 pl-3'>
                <input type="email" placeholder='Enter your email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='w-full sm:flex-1 outline-none'
                />
                <button type='submit'
                    className='bg-black text-white text-xs px-10 py-4'
                >SUBSCRIBE</button>
            </form>

        </div>
    )
}

export default NewLetterBox