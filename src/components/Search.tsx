"use client"
import React, { useState } from 'react'
import SearchIcon from './svg/SearchIcon'
import { usePathname, useRouter } from 'next/navigation'
import Sort from './svg/Sort'

const Search = () => {
    const [search, setSearch] = useState('')
    const pathname = usePathname()
    const router = useRouter()
    const [popup,setPopup]=useState(false)

    const handelSearch = (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.KeyboardEvent<HTMLInputElement>) => {
        router.push(`${pathname}?page=1&search=${search}`)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handelSearch(e)
        }
    }
    const handelSort=(sort:string)=>{
        router.push(`${pathname}?page=1&sort=${sort}`)
        setPopup(!popup)
        setSearch('')
    }


    return (
        <>
        <div className='flex items-center gap-x-5'>
            <div className="flex items-center w-[96%] mx-auto lg:mx-0 lg:w-[50%]">
                <label className="sr-only">Search</label>
                <div className="relative w-full">
                    <input
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={handleKeyDown}
                        type="text"
                        className="bg-gray-50 outline-none border-[2px] text-gray-900 text-sm rounded-lg focus:ring-[#8C7CFD] focus:border-[#8C7CFD] block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#FFD117] dark:focus:border-[#8C7CFD]"
                        placeholder="Search..."
                        value={search}
                        required
                    />
                    <button
                        type="button"
                        onClick={(e) => handelSearch(e)}
                        className="absolute inset-y-0 end-0 flex items-center pr-3"
                    >
                        <SearchIcon />
                    </button>
                </div>
            </div>
             <div className='text-white relative'>
                <button onClick={()=>setPopup(!popup)} className='bg-white bg-opacity-15 px-3 py-1.5 rounded-md shadow-inner hover:scale-90 transition-all'><Sort/></button>
                <div className={` absolute ${popup?'scale-100':'scale-0'} transition-all z-[60] top-[100%] right-0  bg-gray-600 p-1 rounded-md`}>
                    <button onClick={()=>handelSort('desc')} className='px-6 py-1 hover:bg-gray-500 transition-all rounded-md w-full'>Descending</button>
                    <button onClick={()=>handelSort('asc')} className='px-6 py-1 hover:bg-gray-500 transition-all rounded-md w-full'>Ascending</button>
                </div>
             </div>
        </div>
        {popup&&<div onClick={()=>setPopup(!popup)} className='w-full h-screen fixed top-0 left-0 bg-black z-[59] bg-opacity-35'></div>}
</>
    )
}

export default Search
