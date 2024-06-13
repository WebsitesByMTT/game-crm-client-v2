'use client'
import React, { useEffect, useState } from 'react'
import Modal from '../modal/Modal'
import Image from 'next/image'
import Link from 'next/link'
import { apiGetGames } from '@/apiConfig/apis'
import { useDispatch, useSelector } from 'react-redux'
import { EditGame, UpdateTable } from '@/redux/ReduxSlice'

const Add_Games = () => {
    const [data, setData] = useState([])
    const tabelstate = useSelector((state) => state.globlestate.TableState)
    const [category, setCategory] = useState('all')
    const dispatch = useDispatch()
    const [type, setType] = useState('')
    const [id,setId]=useState()
    const [modal, setModal] = useState(false)
    const handelModal = (state, type,Id) => {
        setModal(state)
        setType(type)
        setId(Id)
    }
    const handelClosemodal = (state) => {
        setModal(state)
    }

    const handelGames = async () => {
        try {
            const response = await apiGetGames(category)
            if (response.status === 200) {
                setData(response.data)
                dispatch(UpdateTable(false))
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        handelGames()
    }, [tabelstate])

    const handelEdit=(item,type)=>{
       dispatch(EditGame(item))
       handelModal(true, type)
    }

    return (
        <>

            <div className='w-[90%]  mx-auto py-10 h-screen'>
                <div className='sticky top-0 bg-white'>
                    <Link href={'/dashboard'} className='pb-5'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide cursor-pointer lucide-move-left"><path d="M6 8L2 12L6 16" /><path d="M2 12H22" /></svg>
                    </Link>
                    <div className='flex justify-end'>
                        <button onClick={() => handelModal(true, 'addGames')} type="button" class="text-white bg-blue-700 hover:bg-blue-800 cursor-pointer focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add Games</button>
                    </div>
                </div>

                <div className='pt-10'>
                    <table className='w-full'>
                        <thead>
                            <tr className='sticky bg-white top-[70px]'>
                                <th className='pb-5'>GameId</th>
                                <th className='pb-5'>Game Name</th>
                                <th className='pb-5'>Game Thumbnail</th>
                                <th className='pb-5'>Game Host Link</th>
                                <th className='pb-5'>Type</th>
                                <th className='pb-5'>Tags</th>
                                <th className='pb-5'>Date</th>
                                <th className='pb-5'>Category</th>
                                <th className='pb-5'>Status</th>
                                <th className='pb-5'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data?.map((item, ind) => (
                                    <tr key={ind} className={`text-center ${ind % 2 == 0 ? 'bg-gray-100' : ''}`}>
                                        <td>{item._id}</td>
                                        <td>{item.gameName}</td>
                                        <td className='py-3'>
                                            <img src={item?.gameThumbnailUrl} alt='img' width={120} height={40} quality={1000} className='mx-auto' />
                                        </td>
                                        <td>{item.gameHostLink}</td>
                                        <td>{item.type}</td>
                                        <td>{item.tagName}</td>
                                        <td>{new Date(item.createdAt).toLocaleDateString('en-US',{year:'numeric',month:'short',day:'numeric'})}</td>
                                        <td>{item.category}</td>
                                        <td>{item.status===true?<span className='bg-green-200 text-green-900 px-4 py-2 rounded-xl'>Active</span>:<span className='bg-red-200 text-red-900 px-4 py-2 rounded-xl'>InActive</span>}</td>
                                        <td>
                                            <div className='w-full flex justify-center items-center space-x-4'>
                                                <span onClick={() => handelModal(true, 'deleteGame',item._id)}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide cursor-pointer text-red-500 lucide-trash-2"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" /></svg></span>
                                                <span onClick={()=>handelEdit(item,'updateStatus')}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide cursor-pointer text-indigo-500 lucide-file-pen-line"><path d="m18 5-3-3H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2" /><path d="M8 18h1" /><path d="M18.4 9.6a2 2 0 1 1 3 3L17 17l-4 1 1-4Z" /></svg></span>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            }

                        </tbody>
                    </table>
                </div>
            </div>
            <Modal handelClosemodal={handelClosemodal} deletegame_id={id} type={type} modal={modal} />
        </>
    )
}

export default Add_Games
