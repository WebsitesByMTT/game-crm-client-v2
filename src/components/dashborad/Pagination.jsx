import React from 'react'

const Pagination = () => {
    return (
        <div className='p-2 h-full'>
            <div className='py-3 bg-gradient-to-r h-full from-cyan-500 rounded-xl to-blue-500 px-10'>
                <div className='flex items-center space-x-3'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg>
                    <span className='bg-red-500 p-2 rounded-full'>1</span>
                </div>
            </div>
        </div>

    )
}

export default Pagination
