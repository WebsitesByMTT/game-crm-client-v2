"use client"
import React, { useState } from 'react'
import Modal from '../modal/Modal'
import { useDispatch, useSelector } from 'react-redux'
import { CheckBoxFilter, TransactionType } from '@/redux/ReduxSlice'

const TopBar = ({ data }) => {
    const clientdata=useSelector((state)=>state.globlestate.clientData)

    const dispatch=useDispatch()
    const [type,setType]=useState('')
    const [modal, setModal] = useState(false)
    
    const handelModal = (state,type) => {
        setModal(state)
        setType(type)
        type==='transaction'&&dispatch(TransactionType(true))
    }
    const handelClosemodal = (state) => {
        setModal(state)
    }

    return (
        <>

            <div className='p-2 h-full' >
                <div className='py-5 bg-gradient-to-r from-cyan-500 h-full rounded-xl to-blue-500 px-10'>
                    <div className='flex items-center justify-between w-full'>
                        <div className='mt-5 w-[80%] sm:flex sm:items-center'>
                            <input id="q" name="q" className="inline w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-3 leading-5 placeholder-gray-500 focus:border-indigo-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm" placeholder="Search Account" type="search" autofocus="" value="" />
                        </div>
                        <div className=' text-white cursor-pointer'>
                            <div className='bg-white  w-[200px] text-black p-2 rounded-xl'>
                                <div className='flex justify-around'>
                                    <label for="all" >All</label>
                                    <input onChange={()=>dispatch(CheckBoxFilter("all"))} type='radio' name='account_filter' id='all' />
                                </div>
                                <div className='flex justify-around'>
                                    <label for="active" >Active</label>
                                    <input onChange={()=>dispatch(CheckBoxFilter("active"))} type='radio' name='account_filter' id='active' />
                                </div>
                                <div className=' flex justify-around'>
                                    <label for="InActive" >InActive</label>
                                    <input onChange={()=>dispatch(CheckBoxFilter("inactive"))} type='radio' name='account_filter' id='InActive' />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center justify-between pt-5'>
                        <div className='space-y-3'>
                            <div>Account : <span className='text-white capitalize'>{data?.username}</span></div>
                            <div>Credits : <span className='text-white'>{data?.credits}</span></div>
                        </div>
                        {clientdata?.username&&<div className='text-white'>
                            <span>Switched Account :</span>
                            <span className='pl-2 capitalize font-bold'>{clientdata?.username}</span>
                        </div>}
                        <button  onClick={() => handelModal(true, 'add_client')} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add Client</button>
                    </div>

                    {/* Button  */}
                    {clientdata?.username&&<div className='flex justify-around items-center pt-10'>
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
        </>
    )
}

export default TopBar
