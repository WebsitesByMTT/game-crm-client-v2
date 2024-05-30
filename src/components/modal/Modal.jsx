import { AddClientDataApi, AddCreditApi, apiChangePassword, apiDelete, apiTransaction } from '@/apiConfig/apis'
import { ReportState, UpdateTable } from '@/redux/ReduxSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

const Modal = ({ clientData, modal, handelClosemodal, type, data }) => {
    const dispatch = useDispatch()
    //Add Client
    const [addClient, setAddClient] = useState({
        "clientNickName": "",
        "clientUserName": "",
        "password": "",
    })
    const clientdata = { ...addClient, "username": data?.username }
    const handelClientChange = (e) => {
        let { name, value } = e.target
        setAddClient({ ...addClient, [name]: value })
    }

    const handelAddClient = async () => {
        try {
            const response = await AddClientDataApi(clientdata)
            if (response.status === 201) {
                handelClosemodal(false)
                toast(response.data.message, { type: 'success' })
                dispatch(UpdateTable(true))
            }
        } catch (error) {
            console.log(error)
        }
    }
    //Add Client
    //Add Credits
    const [credit, setCredit] = useState('')
    const handelAddCredit = async (clientUserName, type) => {
        const creditdata = {
            credits: type == "redeem" ? String(-credit) : credit,
        }
        try {
            const response = await AddCreditApi(clientUserName, creditdata)
            if (response.status === 200) {
                dispatch(UpdateTable(true))
                handelClosemodal(false)
                toast(response.data.message, { type: 'success' })
            }
        } catch (error) {
            console.log(error)

        }
    }
    //Add Credits

    //Change Pssword
    const [password, setPassword] = useState({
        password: '',
        ConfirmPassword: ''
    })
    const handelPassword = (e) => {
        let { name, value } = e.target
        setPassword({ ...password, [name]: value })
    }

    const handelChangePassword = async () => {
        const changePasswordData = {
            changedPassword: password.password
        }

        try {
            const response = await apiChangePassword(clientData?.username, changePasswordData)
            if (response.status === 200) {
                toast(response.data.message, { type: 'success' })
                handelClosemodal(false)
            }
        } catch (error) {

        }
    }
    //Change Password

    //Transaction
    const [transaction, setTransaction] = useState([])
    const handelTransaction = async () => {
        if (clientData?.username) {
            try {
                const response = await apiTransaction(clientData?.username)
                console.log(response)
                if (response.status === 200) {
                    setTransaction(response.data)
                }
            } catch (error) {

            }
        }
    }
    useEffect(() => {
        handelTransaction()
    }, [type === "transaction"])
    //Transaction

    //Delete
    const handelDelete = async (deletethis) => {
        try {
            const response = await apiDelete(deletethis)
            if (response.status === 204) {
                toast("Deleted !", { type: 'success' })
                handelClosemodal(false)
                dispatch(UpdateTable(true))
                window.location.reload()
            }
        } catch (error) {

        }
    }
    //Delete


    return (
        modal && <>
            <div className={`absolute ${modal ? 'scale-100 transition-all' : 'scale-50 transition-all'} z-50 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white w-[50%] p-5 rounded-lg`}>
                <div onClick={() => handelClosemodal(false)} className='w-[30px] ml-auto cursor-pointer'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                </div>

                {/* Recharge Content */}
                {type === 'recharge' && <div>
                    <div>Username : <span>{clientData?.username}</span></div>
                    <div className='pt-5'>
                        <div>
                            <label for="add_credit" class="block mb-2 text-sm font-medium text-black">Add Credit</label>
                            <input value={credit} onChange={(e) => setCredit(e.target.value)} type="text" id="add_credit" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="add credit" required />
                        </div>
                        <div className='flex justify-center pt-5'>
                            <button onClick={() => handelAddCredit(clientData?.username)} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add</button>
                        </div>
                    </div>
                </div>}
                {/* Recharge Content */}
                {/* Reddem Content */}
                {type === 'redeem' && <div>
                    <div>Username : <span>{clientData?.username}</span></div>
                    <div className='pt-5'>
                        <div>
                            <label for="redeem_credit" className="block mb-2 text-sm font-medium text-black">Redeem Credit</label>
                            <input value={credit} onChange={(e) => setCredit(e.target.value)} type="text" id="redeem_credit" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="redeem credit" required />
                        </div>
                        <div className='flex justify-center pt-5'>
                            <button onClick={() => handelAddCredit(clientData?.username, "redeem")} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Reddem</button>
                        </div>
                    </div>
                </div>}
                {/* Redeem Content */}
                {/* Update Password Content */}
                {type === 'update_password' && <div>
                    <div>Username : <span>{clientData?.username}</span></div>
                    <div className='pt-5'>
                        <div>
                            <label for="new_password" className="block mb-2 text-sm font-medium text-black">Enter New Password</label>
                            <input value={password.password} onChange={(e) => handelPassword(e)} name='password' type="text" id="new_password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="new password" required />
                        </div>
                        <div className='pt-5'>
                            <label for="Confirm_Password" class="block mb-2 text-sm font-medium text-black">Enter Confirm Password</label>
                            <input value={password.ConfirmPassword} name='ConfirmPassword' onChange={(e) => handelPassword(e)} type="text" id="Confirm_Password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="confirm password" required />
                        </div>
                        <div className='flex justify-center pt-5'>
                            <button onClick={() => handelChangePassword()} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Update</button>
                        </div>
                    </div>
                </div>}
                {/* Update Password Content */}
                {/* Transaction Content */}
                {type === 'transaction' &&
                    <div>
                        <table className='w-full'>
                            <thead>
                                <tr>
                                    <th>Creditor</th>
                                    <th>Debitor</th>
                                    <th>Credits/Reddemed</th>
                                    <th>Date & Time</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    transaction?.map((item, ind) => (
                                        <tr key={ind} className='text-center bg-green-200 py-2'>
                                            <td>{item.creditor}</td>
                                            <td>{item.debitor}</td>
                                            <td>{item.credit}</td>
                                            <td>{item.createdAt}</td>
                                        </tr>
                                    ))
                                }

                            </tbody>

                        </table>
                    </div>}
                {/* Transaction Content */}
                {/* Report Content */}
                {type === 'report' &&
                    <div>
                        <table className='w-full'>
                            <thead>
                                <tr>
                                    <th>Total Recharged</th>
                                    <th>Total Redeemed</th>
                                    <th>Holding Percentage</th>
                                </tr>
                                <tr className='text-center py-2'>
                                    <td>{clientData?.totalRecharged}</td>
                                    <td>{clientData?.totalRedeemed}</td>
                                    <td>{(Math.round((clientData?.credits / clientData?.totalRecharged) * 100)) ? (Math.round((clientData?.credits / clientData?.totalRecharged) * 100)) : 0}%</td>
                                </tr>
                            </thead>
                        </table>
                    </div>}
                {/* Report Content */}
                {/* Delete Content */}
                {type === 'delete' && <div>
                    <div className='pt-5'>
                        <div className='text-center text-black font-semibold'>Are You Want to Delete to {clientData?.username}?</div>
                        <div className='flex items-center  justify-center pt-10 space-x-10'>
                            <button onClick={() => handelDelete(clientData?.username)} type="button" className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Yes</button>
                            <button onClick={() => handelClosemodal(false)} type="button" className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">No</button>
                        </div>
                    </div>
                </div>}
                {/* Redeem Content */}
                {/* Add Client Content */}
                {type === 'add_client' && <div>
                    <div className='text-center'>Add Client</div>
                    <div className='pt-5 space-y-3'>
                        <div>
                            <label for="UserName" className="block mb-2 text-sm font-medium text-black">User Name</label>
                            <input type="text" id="UserName" onChange={(e) => handelClientChange(e)} value={addClient.clientUserName} name='clientUserName' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="user name" required />
                        </div>
                        <div>
                            <label for="NickName" className="block mb-2 text-sm font-medium text-black">Nick Name</label>
                            <input type="text" id="NickName" onChange={(e) => handelClientChange(e)} value={addClient.clientNickName} name='clientNickName' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="nick name" required />
                        </div>
                        <div>
                            <label for="password" className="block mb-2 text-sm font-medium text-black">Password</label>
                            <input type="text" id="password" onChange={(e) => handelClientChange(e)} value={addClient.password} name='password' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="password" required />
                        </div>
                        <div className='flex justify-center pt-5'>
                            <button onClick={() => handelAddClient()} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add</button>
                        </div>
                    </div>
                </div>}
                {/* Add Client Content */}
            </div>
            <div onClick={() => handelClosemodal(false)} className='bg-black transition-all bg-opacity-40 w-full h-screen absolute top-0 left-0'></div>
        </>
    )
}

export default Modal
