import React from 'react'

const LeftSideBar = () => {
    return (
        <div className='py-20 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 px-10 flex flex-col justify-between border h-full'>
            <div>
                <div className='flex items-center space-x-4'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide text-black rounded-full bg-white p-1 lucide-circle-user-round"><path d="M18 20a6 6 0 0 0-12 0" /><circle cx="12" cy="10" r="4" /><circle cx="12" cy="12" r="10" /></svg>
                    <div className='font-semibold text-white'>User Name</div>
                </div>
                <div className='pt-2'>
                   <span className='text-white font-semibold'>(Company)</span> 
                </div>
            </div>
            <div>
               <button className='text-center w-[60%] mx-auto text-white text-[1rem] rounded-md py-2 font-semibold bg-gradient-to-r hover:from-cyan-800 hover:to-blue-500 transition-all to-cyan-800 from-blue-500'>LOGOUT</button>
            </div>
        </div>
    )
}

export default LeftSideBar
