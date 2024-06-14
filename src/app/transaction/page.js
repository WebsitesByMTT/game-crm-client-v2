"use client"
import { GetUserDataApi, apiTransaction } from '@/apiConfig/apis'
import LeftSideBar from '@/components/dashborad/LeftSideBar'
import Loader from '@/utils/Loader'
import React, { useEffect, useState } from 'react'


const Page = () => {
    const [load,setLoad]=useState(false)
    const [data, setData] = useState()
    const handelUserData = async () => {
        try {
            const response = await GetUserDataApi()
            if (response.status === 200) {
                setData(response.data)
                handelTransaction(response.data.username)
            }
        } catch (error) {

        }
    }

    //Transaction
    const [transaction, setTransaction] = useState([])
    const handelTransaction = async (data_username) => {
        try {
            setLoad(true)
            const response = await apiTransaction(data_username)
            console.log(response)
            if (response.status === 200) {
                setTransaction(response.data)
            }
            setLoad(false)
        } catch (error) {
            setLoad(false)
        }
    }
    //Transaction

    useEffect(() => {
        handelUserData()
    }, [])
    return (
        <>
        <div className='grid grid-cols-12 h-screen grid-rows-12'>
            <div className=' p-2  row-span-12 col-span-2'>
                <LeftSideBar text={'Dashboard'} data={data} />
            </div>
            <div className='px-2 pb-5 overflow-y-scroll row-span-12 col-span-10'>
                <table className='w-full'>
                    <thead>
                        <tr className='text-center sticky top-0 bg-indigo-600 text-white'>
                            <th className='py-2'>Creditor</th>
                            <th>Creditor Designation</th>
                            <th>Debitor</th>
                            <th>Credit/Redeem</th>
                            <th>Debitor Designation</th>
                            <th>Date & Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            transaction?.map((item, ind) => (
                                <tr key={ind} className={`${ind % 2 === 1 ? 'bg-white' : 'bg-gray-100'} text-center`}>
                                    <td className='py-2'>{item.creditor}</td>
                                    <td>{item.creditorDesignation}</td>
                                    <td>{item.debitor}</td>
                                    {item.credit?<td>{item.credit?.includes('-')?<span className='text-red-500'>{item.credit}</span>:<span className='text-green-500'>+{item.credit}</span>}</td>:<td></td>}
                                    <td>{item.debitorDesignation}</td>
                                    <td>{new Date(item.createdAt).toLocaleDateString('en-US',{year:'numeric',month:'short',day:'numeric'})},<span className='pl-5'>{item.createdAtTime}</span></td>
                                </tr>
                            ))
                        }
                    </tbody>



                </table>
            </div>
        </div>
        <Loader show={load}/>
        </>
    )
}

export default Page
