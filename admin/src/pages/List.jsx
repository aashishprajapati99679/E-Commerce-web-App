import React, { useEffect, useState } from 'react'
import { backendUrl } from '../App'
import axios from 'axios'
import { toast } from 'react-toastify';
import { currency } from '../App';



const List = ({ token }) => {

    const [list, setList] = useState([]);

    // fetch the data of product
    const fetchList = async () => {

        try {
            const response = await axios.get(backendUrl + '/api/product/list');
            if (response.data.success) {
                setList(response.data.data);
            } else {
                toast.error(response.data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error("Something went wrong check console");

        }

    }


    const removeProduct = async (id) => {
        try {

            const response = await axios.post(backendUrl + '/api/product/remove', { id }, { headers: { token } })
            if (response.data.success) {
                toast.success(response.data.message);
                fetchList();
            } else {
                toast.error(response.data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error("Something went wrong check console");
        }
    }


    useEffect(() => {
        fetchList()
    }, [])



    return (
        <>
            <p className='mb-2' >List of all products</p>
            <div className='flex flex-col gap-2' >

                {/* list table title  */}
                <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>

                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b className='text-center' >Actions</b>
                </div>

                {/* list of products */}
                {
                    list.map((item, index) => (
                        <div key={index} className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] gap-2 items-center py-1 px-2 border text-sm'>
                            <img className='w-12' src={item.image?.[0]} />
                            <p>{item.name}</p>
                            <p>{item.category}</p>
                            <p>{currency}{item.price}</p>
                            <p onClick={() => removeProduct(item._id)} className='md:text-center text-right text-lg cursor-pointer' >X</p>
                        </div>
                    ))

                }

            </div>


        </>
    )
}

export default List