import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios'
import { toast } from 'react-hot-toast'

const Login = () => {


  const [currentState, setCurrentState] = useState('Login');
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const onsubmitHandler = async (event) => {
    event.preventDefault();

    try {

      if (currentState === 'Sign Up') {

        const response = await axios.post(backendUrl + '/api/user/register', { name, email, password })

        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token);
          toast.success("Registered Successfully!");
        }
        else {

          toast.error(response.data.message);

        }
      } else {
        const response = await axios.post(backendUrl + '/api/user/login', { email, password });

        if (response.data.success) {

          setToken(response.data.token);
          localStorage.setItem('token', response.data.token)
          toast.success("Login Successfully!");
        }
        else {
          toast.error(response.data.message);
        }
      }


    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }

  }


  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])

  return (
    <form onSubmit={onsubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>

      {currentState === 'Login' ? ' ' :
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text" className='w-full px-3 py-2 border border-gray-400' placeholder='Name' required />}

      <input type="email"
        className='w-full px-3 py-2 border border-gray-400'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder='Email' required />

      <input type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className='w-full px-3 py-2 border border-gray-400'
        placeholder='Password' required />

      <div className='w-full justify-between flex flex-row text-sm mt-[8px]'>
        <p className='cursor-pointer'>Forgot Password?</p>
        {
          currentState === 'Login'
            ? <p onClick={() => setCurrentState('Sign Up')} className='cursor-pointer'>| Create an Account |</p> :
            <p onClick={() => setCurrentState('Login')} className='cursor-pointer'>| Login Here |</p>
        }

      </div>
      <button
        className='bg-black text-white px-8 py-2 mt-4 cursor-pointer'
      >{currentState === 'Login' ? 'Sing In' : 'Sing Up'}</button>
    </form>
  )
}

export default Login
