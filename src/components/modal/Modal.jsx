import { AddClientDataApi, AddCreditApi, apiAddGames, apiChangePassword, apiDelete, apiEditGames, apiTransaction, apiUpload } from '@/apiConfig/apis'
import { ClientData, TransactionType, UpdateTable } from '@/redux/ReduxSlice'
import Loader from '@/utils/Loader'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const Modal = ({ clientData, modal, handelClosemodal, type, data,deletegame_id }) => {
    const dispatch = useDispatch()
    const [load,setLoad]=useState(false)
    const EditGameData = useSelector((state) => state.globlestate.GameEditData)
    const Transaction = useSelector((state) => state.globlestate.TransactionType)
    //Add Client
    const [addClient, setAddClient] = useState({
        clientNickName: "",
        clientUserName: "",
        password: "",
    })
    const clientdata = { ...addClient, "username": data?.username }
    const handelClientChange = (e) => {
        let { name, value } = e.target
        setAddClient({ ...addClient, [name]: value })
    }

    const handelAddClient = async () => {
        if (!addClient.clientUserName) {
            toast("Enter Client UserName", { type: 'error' })
        } else if (!addClient.clientNickName) {
            toast("Enter Client NickName", { type: 'error' })
        } else if (!addClient.password) {
            toast("Enter Client Password", { type: 'error' })
        } else {
            try {
                setLoad(true)
                const response = await AddClientDataApi(clientdata)
                if (response.status === 201) {
                    handelClosemodal(false)
                    toast(response.data.message, { type: 'success' })
                    dispatch(UpdateTable(true))
                }
                setLoad(false)
            } catch (error) {
                setLoad(false)
                handelClosemodal(false)
                toast(error.response.data.error, { type: 'error' })
            }
        }
    }
    //Add Client
     //Add Credits
    const regex = /^[0-9\b]+$/;
   
     const [credit, setCredit] = useState('')
     const handelAddCredit = async (clientUserName, type) => {
         const creditdata = {
             credits: type == "redeem" ? Number(-credit) : Number(credit),
         }
 
         if (!credit) {
             toast(`Enter ${type === "redeem" ? 'Redeem' : 'Credit'} Value`, { type: 'error' })
         }else if(credit<=0||regex.test(credit)===false){
            toast('InValid Value !',{type:'error'})
         }else {
             try {
                 setLoad(true)
                 const response = await AddCreditApi(clientUserName, creditdata)
                 if (response.status === 200) {
                     dispatch(UpdateTable(true))
                     handelClosemodal(false)
                     toast(response.data.message, { type: 'success' })
                 }
                 setLoad(false)
             } catch (error) {
                 setLoad(false)
                 handelClosemodal(false)
                 toast(error.response.data.error, { type: 'error' })
             }
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
        if (!password.password) {
            toast('Enter New Password', { type: 'error' })
        } else if (!password.ConfirmPassword) {
            toast('Enter Confirm Password', { type: 'error' })
        } else if (password.password !== password.ConfirmPassword) {
            toast('Password not matching', { type: 'error' })
        } else {
            try {
                setLoad(true)
                const response = await apiChangePassword(clientData?.username, changePasswordData)
                if (response.status === 200) {
                    toast(response.data.message, { type: 'success' })
                    handelClosemodal(false)
                }
                setLoad(false)
            } catch (error) {

            }
        }

    }
    //Change Password

    //Transaction
    const [transaction, setTransaction] = useState([])
    const handelTransaction = async () => {
        if (clientData?.username) {
            try {
                setLoad(true)
                const response = await apiTransaction(clientData?.username)
                if (response.status === 200) {
                    setTransaction(response.data)
                    dispatch(TransactionType(false))
                }
                setLoad(false)
            } catch (error) {

            }
        }
    }
    useEffect(() => {
        handelTransaction()
    }, [Transaction])
    //Transaction

    //Delete
    const handelDelete = async (deletethis) => {
        try {
            const response = await apiDelete(deletethis)
            if (response.status === 204) {
                toast("Deleted !", { type: 'success' })
                handelClosemodal(false)
                dispatch(UpdateTable(true))
                dispatch(ClientData({}))
            }
        } catch (error) {
            setLoad(false)
        }
    }
    //Delete

    //Add Games
    const [gamethumbnail, setGameThumbnail] = useState(null)
    const handleImageChange = async (e) => {
        setGameThumbnail(e.target.files[0]);
        const reader = new FileReader();
        reader.onloadend = async () => {
            const base64String = reader.result;
            const imagedata={
                image:base64String
            }
            try {
                setLoad(true)
                const response = await apiUpload(imagedata);
                if(response.status===200){
                  toast(response.data.message,{type:'success'})
                  setGames({...games,gamethumbnail:response.data.imageUrl})
                }
                setLoad(false)
            } catch (error) {
                setLoad(false)
                console.error("Error during upload:", error);
            }
        };
    
        // Start reading the file as a data URL
        reader.readAsDataURL(e.target.files[0]);
    };
    const [games, setGames] = useState({
        gameName: '',
        gameHostLink: '',
        gamethumbnail: '',
        type: '',
        category: '',
        tags: '',
        status: Boolean,
    });

    useEffect(() => {
        setGames({status: Boolean(EditGameData?.status)});
    }, [EditGameData]); // Depend on EditGameData so this effect runs whenever it changes

    const gameData={
        gameName:games?.gameName,
        gameThumbnailUrl: games.gamethumbnail,
        gameHostLink: games.gameHostLink,
        type: games.type,
        category: games.category,
        status:Boolean(games.status),
        tagName:games.tags
      }
    const handelGameChange = (e) => {
        const { name, value } = e.target
        setGames({ ...games, [name]: value })
    }

    const handelAddGame=async()=>{
       
       try {
          const response=await apiAddGames(gameData) 
          if(response.status===201){
            toast('Game Added',{type:'success'})
            handelClosemodal()
            dispatch(UpdateTable(true))
          }
       } catch (error) {
         console.log(error)
         handelClosemodal()
       }
    }
    //Add Games

    //Delete Games
    const handelDeleteGame=async(type,deletegame_id)=>{
        const deleteData={
            _id:deletegame_id,
            type:type
        }
        
        try {
            setLoad(true)
            const response = await apiEditGames(deleteData)
            if(response.status===200){
               toast(response.data.message,{type:'success'})
               handelClosemodal()
               dispatch(UpdateTable(true))
            }
            setLoad(false)
        } catch (error) {
            setLoad(false)
            console.log(error)
        }
    }
    //Delete Games

    //Update Games Status
    const handelUpdateGameStatus=async()=>{
        const updateStatusData={
            _id:EditGameData?._id,
            type:type,
            status:games.status
        }
        try {
            const response = await apiEditGames(updateStatusData)
            if(response.status===200){
                toast(response.data.message,{type:'success'})
                handelClosemodal()
                dispatch(UpdateTable(true))
             }
        } catch (error) {
            
        }
    }
    //Update Games Status

    return (
        modal && <>
            <div className={`fixed ${modal ? 'scale-100 transition-all' : 'scale-50 transition-all'} z-50 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white w-[50%] p-5 rounded-lg`}>
                <div onClick={() => handelClosemodal(false)} className='w-[30px] ml-auto cursor-pointer'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-x"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                </div>

                {/* Recharge Content */}
                {type === 'recharge' && <div>
                    <div>Username : <span>{clientData?.username}</span></div>
                    <div className='pt-5'>
                        <div>
                            <label for="add_credit" className="block mb-2 text-sm font-medium text-black">Add Credit</label>
                            <input value={credit} onChange={(e) => setCredit(e.target.value)} type="text" id="add_credit" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="add credit" required />
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
                            <input value={credit} onChange={(e) => setCredit(e.target.value)} type="text" id="redeem_credit" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="redeem credit" required />
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
                            <label for="Confirm_Password" className="block mb-2 text-sm font-medium text-black">Enter Confirm Password</label>
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
                                    <th>Debitor Designation</th>
                                    <th>Date & Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    transaction?.map((item, ind) => (
                                        <tr key={ind} className='text-center bg-green-200 py-2'>
                                            <td>{item.creditor}</td>
                                            <td>{item.debitor}</td>
                                            {item.credit ? <td>{item.credit?.includes('-') ? <span className='text-red-500'>{item.credit}</span> : <span className='text-green-500'>+{item.credit}</span>}</td> : <td></td>}
                                            <td>{item.debitorDesignation}</td>
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
                {/* Add Games */}
                {((type === 'addGames')|| (type==='updateStatus')) && <div className='h-[80vh] overflow-y-scroll'>
                    <div className='text-center'>Add Games</div>
                    <div className='pt-5 space-y-3 '>
                       {type==="updateStatus"?null:<>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-black">Game Name</label>
                            <input type="text" onChange={(e) => handelGameChange(e)} value={games?.gameName} name='gameName' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="game name" required />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-black">Game Thumbnail</label>
                            <div class="relative">
                                <input onChange={(e) =>handleImageChange(e)} type="file" className="hidden" id="fileUpload" accept="image/*" />
                                <label for="fileUpload" className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-20 rounded">
                                    Upload File
                                </label>
                                <p id="fileName" className="flex mt-4">
                                    {gamethumbnail && <Image src={URL.createObjectURL(gamethumbnail)} alt='img' width={200} height={10} className='mr-4' />}
                                    {games.gamethumbnail&&<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide bg-green-600 text-white rounded-full p-1 lucide-circle-check-big"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>}
                                </p>
                            </div>
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-black">Game Host Link</label>
                            <input type="text" onChange={(e) => handelGameChange(e)} value={games.gameHostLink} name='gameHostLink' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="game host link" required />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-black">Type</label>
                            <input type="text" onChange={(e) => handelGameChange(e)} value={games.type} name='type' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Type" required />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-black">Category</label>
                            <input type="text" onChange={(e) => handelGameChange(e)} value={games.category} name='category' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Category" required />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-black">Tags</label>
                            <input type="text" onChange={(e) => handelGameChange(e)} value={games.tags} name='tags' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="tags   " required />
                        </div>
                        </>}
                        {type==="updateStatus"&&<div>
                            <label className="block mb-2 text-sm font-medium text-black">Status</label>
                            <input type="text" onChange={(e) => handelGameChange(e)} value={games.status} name='status' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Status" required />
                        </div>}
                        <div onClick={type!=="updateStatus"?handelAddGame:handelUpdateGameStatus} className='flex justify-center pt-5'>
                            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">{type==="updateStatus"?'Update':'Add'}</button>
                        </div>
                    </div>
                </div>}
                {/* Add Games */}
                {/* Delete Games */}
                {type === 'deleteGame' && <div>
                    <div className='pt-5'>
                        <div className='text-center text-black font-semibold'>Are You Want to Delete This Game?</div>
                        <div className='flex items-center  justify-center pt-10 space-x-10'>
                            <button onClick={() => handelDeleteGame(type,deletegame_id)} type="button" className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Yes</button>
                            <button onClick={() => handelClosemodal(false)} type="button" className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">No</button>
                        </div>
                    </div>
                </div>}
            </div>
            <div onClick={() => handelClosemodal(false)} className='bg-black transition-all bg-opacity-40 w-full h-screen fixed top-0 left-0'></div>
            <Loader show={load}/>
        </>
    )
}

export default Modal
