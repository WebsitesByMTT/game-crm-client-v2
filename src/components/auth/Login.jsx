"use client"
import { LoginApi } from '@/apiConfig/apis';
import { ClientData } from '@/redux/ReduxSlice';
import Loader from '@/utils/Loader';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { toast } from 'react-toastify';

const UserLogin = () => {
    const [data, setData] = useState({ username: '', password: '', captcha: '' })
    const [hide, setHide] = useState(false)
    const [load,setLoad]=useState(false)
    const dispatch=useDispatch()
    const router = useRouter()
    useEffect(() => {
        loadCaptchaEnginge(6)
    }, [])
    const handelChange = (e) => {
        let { name, value } = e.target
        setData({ ...data, [name]: value })
    }

    const handelPasswordShowHide = () => {
        setHide(!hide)
    }

    const handelLogin = async () => {
        const login_data = {
            username: data.username,
            password: data.password
        }
        if (!login_data.username) {
            toast('Enter UserName', { type: 'error' })
        } else if (!login_data.password) {
            toast('Enter Password', { type: 'error' })
        } else if (!data.captcha) {
            toast('Enter Captcha', { type: 'error' })
        } else if (validateCaptcha(data.captcha) == false) {
            toast('InValid Captcha', { type: 'error' })
        } else {
            try {
                setLoad(true)
                const response = await LoginApi(login_data)
                if (response?.status === 200) {
                    toast(response.responseData.message, { type: 'success' })
                    Cookies.set('userToken',response.responseData.token)
                    router.push('/dashboard')
                    dispatch(ClientData(''))
                }else{
                    toast(response.responseData.error, { type: 'error' })
                }
                setLoad(false)
            } catch (error) {
                setLoad(false)
            }
        }

    }


    return (
        <>
            <div className='w-full relative h-screen bg-[#141414]'>
                <div className='bg-white w-[90%] md:w-[50%] lg:w-[40%] 2xl:w-[30%] rounded-md p-5 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
                    <h1 className='text-center font-semibold text-3xl text-black'>Login</h1>
                    <div className='w-[90%] space-y-10 mx-auto pt-8'>
                        <div className='space-y-2'>
                            <label htmlFor="username">Username</label>
                            <div className='flex items-center space-x-3 border-b border-gray-400'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                                <input type="text" name='username' placeholder='Type your username' value={data.username} onChange={(e) => handelChange(e)} className='outline-none w-full text-xl px-2 py-1.5 placeholder:text-[1rem]' />
                            </div>
                        </div>
                        <div className='space-y-2'>
                            <label htmlFor="password">Password</label>
                            <div className='flex items-center space-x-3 border-b border-gray-400'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-key-round"><path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z" /><circle cx="16.5" cy="7.5" r=".5" fill="currentColor" /></svg>
                                <input type={hide ? 'text' : 'password'} name='password' placeholder='Type your password' value={data.password} onChange={(e) => handelChange(e)} className='outline-none w-full text-xl px-2 py-1.5 placeholder:text-[1rem]' />
                                {data.password.length > 0 && <div>
                                    {!hide ? <svg onClick={handelPasswordShowHide} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide cursor-pointer lucide-eye"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
                                        :
                                        <svg onClick={handelPasswordShowHide} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide cursor-pointer lucide-eye-off"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" /><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" /><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" /><line x1="2" x2="22" y1="2" y2="22" /></svg>
                                    }
                                </div>}

                            </div>
                        </div>
                        <div className='space-y-2'>
                            <div className='flex items-center space-x-3 border-b border-gray-400'>
                                <input type="text" name='captcha' placeholder='Enter Captcha' value={data.captcha} onChange={(e) => handelChange(e)} className='outline-none w-full text-xl px-2 py-1.5 placeholder:text-[1rem]' />
                                <LoadCanvasTemplate />
                            </div>
                        </div>
                        <div className='flex justify-center'>
                            <button onClick={handelLogin} className='text-center w-[60%] mx-auto text-white text-xl rounded-md py-2 font-semibold bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 transition-all to-cyan-500 from-blue-500'>LOGIN</button>
                        </div>
                    </div>
                </div>
            </div>
            <Loader show={load}/>
        </>
    )
}

export default UserLogin
