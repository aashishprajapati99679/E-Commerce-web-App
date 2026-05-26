import React, { useContext, useState } from 'react'
import CartTotal from '../components/cartTotal';
import Title from '../components/Title';
import { assets } from '/src/assets/frontend_assets/assets.js'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import toast from 'react-hot-toast';


const PlaceOrder = () => {

  const {
    navigate,
    backendUrl,
    token,
    cartItem,
    setCartItem,
    getTotalCartAmount,
    delivery_fee,
    products
  } = useContext(ShopContext);

  const [method, setMethod] = useState('cod');

  // delivery information
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: ""
  });

  const onChangeHandle = (event) => {

    const name = event.target.name;
    const value = event.target.value;

    setFormData(data => ({
      ...data,
      [name]: value
    }));

  }

  const onSubmitHandler = async (event) => {

    event.preventDefault();

    try {

      let orderItems = [];

      for (const items in cartItem) {

        for (const item in cartItem[items]) {

          if (cartItem[items][item] > 0) {

            const itemInfo = structuredClone(
              products.find(product => product._id === items)
            );

            if (itemInfo) {

              itemInfo.size = item;
              itemInfo.quantity = cartItem[items][item];

              orderItems.push(itemInfo);

            }

          }

        }

      }


      let orderData = {
        address: formData,
        items: orderItems,
        amount: getTotalCartAmount() + delivery_fee,
      }


      switch (method) {
        //api call for COD
        case "cod":
          const response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token } });
          if (response.data.success) {
            setCartItem({});
            navigate('/orders');
          } else {
            toast.error(response.data.message);
          }
          break;

        // //api call for razorpay
        // case "razorpay":
        //   break;

        default:
          break;
      }

    } catch (error) {

      console.log(error);
      toast.error(error.message + "Error in placing order");

    }

  }

  return (

    <form
      onSubmit={onSubmitHandler}
      className='flex flex-col sm:flex-row justify-evenly gap-4 sm:gap-8 md:gap-12 lg:gap-14 pt-5 sm:pt-10 md:pt-14 lg:pt-16 min-h-[60vh] sm:min-h-[70vh] lg:min-h-[80vh] border-t'
    >

      {/* left side */}

      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>

        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>

        <div className='flex gap-3'>

          <input
            type="text"
            placeholder='First name'
            required
            onChange={onChangeHandle}
            name='firstName'
            value={formData.firstName}
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
          />

          <input
            type="text"
            placeholder='Last name'
            required
            onChange={onChangeHandle}
            name='lastName'
            value={formData.lastName}
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
          />

        </div>

        <input
          type="email"
          placeholder='Enter email'
          required
          onChange={onChangeHandle}
          name='email'
          value={formData.email}
          className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
        />

        <input
          type="text"
          placeholder='Street'
          required
          onChange={onChangeHandle}
          name='street'
          value={formData.street}
          className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
        />

        <div className='flex gap-3'>

          <input
            type="text"
            placeholder='City'
            required
            onChange={onChangeHandle}
            name='city'
            value={formData.city}
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
          />

          <input
            type="text"
            placeholder='State'
            required
            onChange={onChangeHandle}
            name='state'
            value={formData.state}
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
          />

        </div>

        <div className='flex gap-3'>

          <input
            type="number"
            placeholder='Zip code'
            required
            onChange={onChangeHandle}
            name='zipCode'
            value={formData.zipCode}
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
          />

          <input
            type="text"
            placeholder='Country'
            required
            onChange={onChangeHandle}
            name='country'
            value={formData.country}
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
          />

        </div>

        <input
          type="number"
          placeholder='Phone number'
          required
          onChange={onChangeHandle}
          name='phone'
          value={formData.phone}
          className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
        />

      </div>

      {/* right side */}

      <div className='mt-8'>

        <div className='mt-8 min-w-100'>
          <CartTotal />
        </div>

        <div className='mt-12'>

          <Title text1={'PAYMENT'} text2={'METHOD'} />

          <div className='flex gap-3 flex-col lg:flex-row'>

            <div
              onClick={() => setMethod('cod')}
              className='flex items-center gap-3 border p-2 px-3 cursor-pointer'
            >
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>

              <img
                src={assets.stripe_logo}
                className='h-5 mx-4'
                alt=""
              />
            </div>

            <div
              onClick={() => setMethod('cod')}
              className='flex items-center gap-3 border p-2 px-3 cursor-pointer'
            >
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>

              <img
                src={assets.razorpay_logo}
                className='h-5 mx-4'
                alt=""
              />

            </div>

            <div
              onClick={() => setMethod('cod')}
              className='flex items-center gap-3 border p-2 px-3 cursor-pointer'
            >
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>

              <p className='text-gray-500 text-sm font-medium mx-4'>
                CASH ON DELIVERY
              </p>

            </div>

          </div>

          <div className='w-full text-end mt-6'>

            <button
              type='submit'
              className='bg-black text-white px-16 py-3 text-sm cursor-pointer'
            >
              PLACE ORDER
            </button>

          </div>

        </div>

      </div>

    </form>

  )
}

export default PlaceOrder