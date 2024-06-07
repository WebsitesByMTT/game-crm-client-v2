import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react'
import { toast } from 'react-toastify';

const LeftSideBar = ({ text, data }) => {
    const router = useRouter()
    const logOutDispatch = () => {
        Cookies.remove("userToken");
        router.push('/')
        toast("Logout Successfully", { type: 'success' })
    }

    return (
        <div className='py-20 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 px-10 flex flex-col justify-between border h-full'>
            <div>
                <div className='flex items-center space-x-4'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide  text-black rounded-full bg-white p-1 lucide-circle-user-round"><path d="M18 20a6 6 0 0 0-12 0" /><circle cx="12" cy="10" r="4" /><circle cx="12" cy="12" r="10" /></svg>
                    <div className='font-semibold text-white capitalize'>{data?.username}</div>
                </div>
                <div className='pt-2'>
                    <span className='text-white font-semibold'>({data?.designation})</span>
                </div>
                <div className='mt-5 text-center text-white rounded-3xl cursor-pointer bg-indigo-600'>
                    <Link href={text === "Dashboard" ? '/dashboard' : '/transaction'} className='py-2 inline-block'>
                        {text === "Dashboard" ? 'Dashboard' : 'Transaction'}
                    </Link>
                </div>
                <div className='mt-5 text-center text-white rounded-3xl cursor-pointer bg-indigo-600'>
                    <Link href={'/games'} className='py-2 inline-block'>
                        Add Games
                    </Link>
                </div>
            </div>
            <div>
                <button onClick={() => logOutDispatch()} className='text-center w-[60%] mx-auto text-white text-[1rem] rounded-md py-2 font-semibold bg-gradient-to-r hover:from-cyan-800 hover:to-blue-500 transition-all to-cyan-800 from-blue-500'>LOGOUT</button>
            </div>
        </div>
    )
}

export default LeftSideBar
