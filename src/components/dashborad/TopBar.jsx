import React, { useState } from 'react'
import Modal from '../modal/Modal'
import { useDispatch, useSelector } from 'react-redux'
import { CheckBoxFilter, TransactionType } from '@/redux/ReduxSlice'

const TopBar = ({ data }) => {
    const clientdata = useSelector((state) => state.globlestate.clientData)
    const checkboxfilter = useSelector((state) => state.globlestate.CheckBoxFilter)
    const [toggle, setToggle] = useState(false)
    const dispatch = useDispatch()
    const [type, setType] = useState('')
    const [modal, setModal] = useState(false)
    const handelModal = (state, type) => {
        setModal(state)
        setType(type)
        type === 'transaction' && dispatch(TransactionType(true))
    }
    const handelClosemodal = (state) => {
        setModal(state)
    }
    const handelOpenFilter = () => {
        setToggle(!toggle)
    }

    return (
        <div className='p-2 h-full rounded-2xl'>
            <div className=' h-full bg-[#161616] rounded-2xl'>
                <div className='py-5 bg-gradient-to-r  px-2   lg:px-10'>
                    <div className='lg:flex items-center space-y-5 lg:space-y-0 justify-between w-full'>
                        <div className='mt-5 w-full lg:w-[80%] sm:flex sm:items-center'>
                            <input id="q" name="q" className="inline w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-3 leading-5 placeholder-gray-500 focus:border-indigo-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm" placeholder="Search Account" type="search" autofocus="" value="" />
                        </div>
                        <div className=' text-white cursor-pointer'>
                            <div className='relative'>
                                <div onClick={handelOpenFilter}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-sliders-horizontal"><line x1="21" x2="14" y1="4" y2="4" /><line x1="10" x2="3" y1="4" y2="4" /><line x1="21" x2="12" y1="12" y2="12" /><line x1="8" x2="3" y1="12" y2="12" /><line x1="21" x2="16" y1="20" y2="20" /><line x1="12" x2="3" y1="20" y2="20" /><line x1="14" x2="14" y1="2" y2="6" /><line x1="8" x2="8" y1="10" y2="14" /><line x1="16" x2="16" y1="18" y2="22" /></svg>
                                </div>
                                <div className={`${toggle ? 'scale-100 transition-all' : 'scale-0 '} space-y-3 absolute rounded-sm top-[100%] w-[200px] px-5 py-2 right-0 bg-white`}>
                                    <div className={`flex  ${checkboxfilter==='all'?'text-white bg-indigo-500':'text-black'}  py-1  rounded-lg cursor-pointer justify-around`}>
                                        <label className='cursor-pointer'>All
                                            <input onChange={() => dispatch(CheckBoxFilter("all"))} type='radio' name='account_filter' className='hidden' />
                                        </label>
                                    </div>
                                    <div className={`flex  ${checkboxfilter==='active'?'text-white bg-indigo-500':'text-black'}  py-1  rounded-lg cursor-pointer justify-around`}>
                                        <label className='cursor-pointer'>Active
                                            <input onChange={() => dispatch(CheckBoxFilter("active"))} type='radio' name='account_filter' className='hidden' />
                                        </label>
                                    </div>
                                    <div className={`flex  ${checkboxfilter==='inactive'?'text-white bg-indigo-500':'text-black'}  py-1  rounded-lg cursor-pointer justify-around`}>
                                        <label className='cursor-pointer'>Inactive
                                            <input onChange={() => dispatch(CheckBoxFilter("inactive"))} type='radio' name='account_filter' className='hidden' />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='space-y-5 lg:space-y -0 lg:flex items-center justify-between pt-5'>
                        <div className='space-y-3 '>
                            <div className='text-indigo-500'>Account : <span className='text-white capitalize'>{data?.username}</span></div>
                            <div className='text-indigo-500'>Credits : <span className='text-white'>{data && Math.round(data?.credits)}</span></div>
                        </div>
                        {clientdata?.username && <div className='text-white'>
                            <span>Switched Account :</span>
                            <span className='pl-2 capitalize font-bold'>{clientdata?.username}</span>
                        </div>}
                        <button onClick={() => handelModal(true, 'add_client')} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add Client</button>
                    </div>

                    {/* Button  */}
                    {clientdata?.username && <div className='flex flex-wrap lg:justify-around lg:items-center pt-10'>
                        <button onClick={() => handelModal(true, 'delete')} type="button" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800">Delete</button>
                        <button onClick={() => handelModal(true, 'recharge')} type="button" className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none dark:focus:ring-indigo-800">Recharge</button>
                        <button onClick={() => handelModal(true, 'redeem')} type="button" className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none dark:focus:ring-indigo-800">Redeem</button>
                        <button onClick={() => handelModal(true, 'update_password')} type="button" className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none dark:focus:ring-indigo-800">Update Password</button>
                        <button onClick={() => handelModal(true, 'transaction')} type="button" className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none dark:focus:ring-indigo-800">Transaction</button>
                        <button onClick={() => handelModal(true, 'report')} type="button" className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none dark:focus:ring-indigo-800">Report</button>
                    </div>}
                </div>
            </div>
            <Modal clientData={clientdata} data={data} handelClosemodal={handelClosemodal} type={type} modal={modal} />
        </div>
    )
}

export default TopBar
