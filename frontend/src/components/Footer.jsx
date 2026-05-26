import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

const Footer = () => {
    return (
        <div>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

                <div className=''>
                    <img src={assets.logo} className='mb-5 w-32' />
                    <p className='w-full md:w-2/3 text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum fugit quaerat nemo consequatur fugiat? Laudantium qui exercitationem minus, hic aut, saepe neque, sint est vitae quod vero culpa nostrum itaque possimus quos!</p>
                </div>
                <div>
                    <p className='text-xl font-medium mb-5'>COMPANY</p>
                    <ul>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Delivery</li>
                        <li>Privacy policy</li>
                    </ul>

                </div>
                <div>
                    <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li>+91 1234567890</li>
                        <li>aashishprajapati99679@gmail.com</li>
                    </ul>


                </div>

            </div>
            <div>
                <hr />
                <p className='py-5 text-sm text-center'> Copyright 2026@ forever.com - All Rights Reserved. </p>
            </div>
        </div>
    )
}

export default Footer