import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

const OurPolicy = () => {
    return (
        <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs md:text-base text-gray-700'>
            <div>
                <img src={assets.exchange_icon} className='w-12 m-auto md-5' alt="" />
                <p className='font-semibold'>Esay Exchange Policy</p>
                <p className='text-gray-400'>We Offer hassle free exchange Ploicy</p>

            </div>
            <div>
                <img src={assets.quality_icon} className='w-12 m-auto md-5' alt="" />
                <p className='font-semibold'>7 Days Return Policy</p>
                <p className='text-gray-400'>Easy 7 Days Return Ploicy</p>

            </div>
            <div>
                <img src={assets.support_img} className='w-12 m-auto md-5' alt="" />
                <p className='font-semibold'>Best Customer Support</p>
                <p className='text-gray-400'>24/7 Available</p>

            </div>

        </div>
    )
}

export default OurPolicy


