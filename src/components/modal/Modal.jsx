import React from 'react'

const Modal = ({ modal, handelClosemodal, type }) => {

    return (
        modal && <>
            <div className={`absolute ${modal ? 'scale-100 transition-all' : 'scale-50 transition-all'} z-50 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white w-[40%] p-5 rounded-lg`}>
                <div onClick={() => handelClosemodal(false)} className='w-[30px] ml-auto cursor-pointer'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                </div>

                {/* Recharge Content */}
                {type === 'recharge' && <div>
                    <div>Username : <span>User Name</span></div>
                    <div className='pt-5'>
                        <div>
                            <label for="add_credit" class="block mb-2 text-sm font-medium text-black">Add Credit</label>
                            <input type="text" id="add_credit" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="add credit" required />
                        </div>
                        <div className='flex justify-center pt-5'>
                            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add</button>
                        </div>
                    </div>
                </div>}
                {/* Recharge Content */}
                {/* Reddem Content */}
                {type === 'redeem' && <div>
                    <div>Username : <span>User Name</span></div>
                    <div className='pt-5'>
                        <div>
                            <label for="redeem_credit" className="block mb-2 text-sm font-medium text-black">Redeem Credit</label>
                            <input type="text" id="redeem_credit" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="redeem credit" required />
                        </div>
                        <div className='flex justify-center pt-5'>
                            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Reddem</button>
                        </div>
                    </div>
                </div>}
                {/* Redeem Content */}
                {/* Update Password Content */}
                {type === 'update_password' && <div>
                    <div>Username : <span>User Name</span></div>
                    <div className='pt-5'>
                        <div>
                            <label for="new_password" className="block mb-2 text-sm font-medium text-black">Enter New Password</label>
                            <input type="text" id="new_password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="new password" required />
                        </div>
                        <div className='pt-5'>
                            <label for="Confirm_Password" class="block mb-2 text-sm font-medium text-black">Enter Confirm Password</label>
                            <input type="text" id="Confirm_Password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="confirm password" required />
                        </div>
                        <div className='flex justify-center pt-5'>
                            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Update</button>
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
                            <th>Credits</th>
                            <th>Date & Time</th>
                         </tr>
                         <tr className='text-center py-2'>
                            <td>cr Name</td>
                            <td>Db Name</td>
                            <td>credits</td>
                            <td>Date Time</td>
                         </tr>
                      </thead>
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
                            <td>120</td>
                            <td>0</td>
                            <td>100%</td>
                         </tr>
                      </thead>
                   </table> 
                </div>}
                {/* Report Content */}
                 {/* Delete Content */}
                 {type === 'delete' && <div>
                    <div className='pt-5'>
                       <div className='text-center text-black font-semibold'>Are You Want to Delete ?</div>
                       <div className='flex items-center  justify-center pt-10 space-x-10'>
                           <button type="button" className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Yes</button>
                           <button type="button" className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">No</button>
                        </div>
                    </div>
                </div>}
                {/* Redeem Content */}
            </div>
            <div onClick={() => handelClosemodal(false)} className='bg-black transition-all bg-opacity-40 w-full h-screen absolute top-0 left-0'></div>
        </>
    )
}

export default Modal
