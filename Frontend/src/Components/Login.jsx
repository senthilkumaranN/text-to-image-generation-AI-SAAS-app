import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets/assets'
import { AppContext } from '../Context/AppContext'
import { motion } from 'motion/react';
import { toast } from 'react-toastify';
import axios from 'axios';

const Login = () => {

    const [state, setstate] = useState('Login')
    const { setshowLogin, setuser, settoken, backendUrl } = useContext(AppContext)

    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')


    const handleSubmitLogin = async (e) => {
        e.preventDefault()

        try {
            if (state === 'Login') {
                const { data } = await axios.post(backendUrl + '/api/user/login', {
                    email, password
                })

                if (data.success) {
                    settoken(data.token)
                    setuser(data.user)
                    localStorage.setItem('user', JSON.stringify({
                        token: data.token,
                        userid: data.userid,
                        name: data.user.name
                    }));
                    setshowLogin(false)
                    toast(data.message)
                } else {
                    console.log(data.message)
                    toast.error(data.message)
                }
            } else {
                const { data } = await axios.post(`${backendUrl}/api/user/register`, {
                    name, email, password
                })

                if (data.success) {
                    settoken(data.token)
                    setuser(data.user)
                    localStorage.setItem('user', JSON.stringify({
                        token: data.token,
                        userid: data.userid, 
                        name: data.user.name
                    }));
                    setshowLogin(false)
                    toast(data.message)
                } else {
                    console.log(data.message)
                    toast.error(data.message)
                }
            }
        } catch (error) {
            toast.error(error.message)
        }
    }


    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'unset';
        }
    }, [])

    return (
        <div className='fixed top-0 bottom-0 left-0 right-0 z-10 backdrop-blur-sm
     bg-black/30 flex justify-center items-center'>

            <motion.form className='relative bg-white p-10 rounded-xl text-slate-100' onSubmit={handleSubmitLogin}
                initial={{ opacity: 0.2, y: 100 }}
                transition={{ duration: 0.5 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}>
                <h1 className='text-center text-2xl text-neutral-700 font-medium'>{state}</h1>
                <p className='text-sm text-gray-400 text-center'>Welcome back! Please sign in to continue</p>

                {state !== "Login" && <div className='border px-6 pl-5 py-2 flex items-center gap-2 rounded-full mt-5'>
                    <img className='h-6' src={assets.profile_icon} alt='' />
                    <input type='text' onChange={(e) => setname(e.target.value)} value={name} className='outline-none text-sm text-black' placeholder='Full Name' required />
                </div>}


                <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
                    <img src={assets.email_icon} alt='' />
                    <input type='text' onChange={(e) => setemail(e.target.value)} value={email}
                        className='outline-none text-sm text-black' placeholder='Email Id' required />
                </div>


                <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
                    <img src={assets.lock_icon} alt='' />
                    <input type='password' onChange={(e) => setpassword(e.target.value)} value={password}
                        className='outline-none text-sm text-black'
                        placeholder='Password' required />
                </div>

                <p className='text-sm text-blue-600 my-4 cursor-pointer'>Forget Password?</p>


                <button className='bg-blue-600 w-full text-white py-2 rounded-full'>
                    {state === 'Login' ? "Login" : "create account"}</button>
                {
                    state === 'Login' ?
                        <p className='mt-5 text-center text-gray-600'>Don't have an account?<span
                            className='text-blue-600 cursor-pointer' onClick={() => setstate('Sign Up')}>Sign Up</span></p>
                        :
                        <p className='mt-5 text-center text-gray-600'>Already have an account?<span className='text-blue-600 
                cursor-pointer' onClick={() => setstate('Login')}>Login</span></p>
                }
                <img onClick={() => setshowLogin(false)} className='absolute top-5 right-4' src={assets.cross_icon} />
            </motion.form>

        </div>
    )
}

export default Login