import { GetClientDataApi } from '@/apiConfig/apis'
import { ClientData, TransactionType, UpdateTable } from '@/redux/ReduxSlice'
import Loader from '@/utils/Loader'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const BottomBar = ({ data }) => {
   const dispatch = useDispatch()
   const [load,setLoad]=useState(false)
   const tabelstate = useSelector((state) => state.globlestate.TableState)
   const checkboxfilter = useSelector((state) => state.globlestate.CheckBoxFilter)
   const [state, setState] = useState([])
   const handelClientList = async () => {
      const clientdata =
      {
         pageNumber: 1,
         isAll: true,
         username: data?.username
      }
      if (data?.username) {
         try {
            setLoad(true)
            const response = await GetClientDataApi(clientdata)
            if (response.status === 200) {
               setState(response.data.userClientList)
               dispatch(UpdateTable(false))
            }
            setLoad(false)
         } catch (error) {
            setLoad(false)
         }
      }

   }
   useEffect(() => {
      handelClientList()
   }, [data, tabelstate])

   const activeStatus = state.filter((item) => item.activeStatus === true)
   const InactiveStatus = state.filter((item) => item.activeStatus === false)

   const handelUpdate = (item) => {
      dispatch(ClientData(item))
      dispatch(TransactionType(false))
      toast(`Switched to ${item?.username}`, { type: 'success' })
   }

   return (
      <>
      <div className='p-2  h-full'>
         <div className='py-5 h-full overflow-y-scroll bg-[#161616] rounded-xl px-2 lg:px-10'>
            <table className='w-[900px] lg:w-full '>
               <thead>
                  <tr className='text-white rounded-2xl bg-[#080808]'>
                     <th className='py-4'>Management</th>
                     <th>User Name</th>
                     <th>Nick Name</th>
                     <th>Designation</th>
                     <th>Credits</th>
                     <th>Status</th>
                  </tr>
               </thead>
               <tbody>

                  <>
                     {checkboxfilter === "active" && activeStatus?.map((item, ind) => (
                        <tr key={ind} className='text-center  text-white'>
                           <td className='py-2'>
                              <button onClick={() => handelUpdate(item)} className='bg-indigo-500 text-white px-8 py-2 rounded-lg'>Update</button>
                           </td>
                           <td>{item.username}</td>
                           <td>{item.nickName}</td>
                           <td className='capitalize'>{item.designation}</td>
                           <td>{item.credits}</td>
                           {item.activeStatus ? <td className=' text-green-400 px-8  rounded-lg'>Active</td> :
                              <td className=' text-red-500 px-8  rounded-lg'>InActive</td>}
                        </tr>

                     ))}
                  </>
                  <>
                     {checkboxfilter === "inactive" && InactiveStatus?.map((item, ind) => (
                        <tr key={ind} className='text-center text-white'>
                           <td className='py-2'>
                              <button onClick={() => handelUpdate(item)} className='bg-indigo-500 text-white px-8 py-2 rounded-lg'>Update</button>
                           </td>
                           <td>{item.username}</td>
                           <td>{item.nickName}</td>
                           <td className='capitalize'>{item.designation}</td>
                           <td>{item.credits}</td>
                           {item.activeStatus ? <td className=' text-green-400 px-8  rounded-lg'>Active</td> :
                              <td className=' text-red-500 px-8  rounded-lg'>InActive</td>}
                        </tr>

                     ))}
                  </>
                  <>
                     {checkboxfilter === "all" && state?.map((item, ind) => (
                        <tr key={ind} className='text-center text-white'>
                           <td className='py-2'>
                              <button onClick={() => handelUpdate(item)} className='bg-indigo-500 text-white px-8 py-2 rounded-lg'>Update</button>
                           </td>
                           <td>{item.username}</td>
                           <td>{item.nickName}</td>
                           <td className='capitalize'>{item.designation}</td>
                           <td>{item.credits}</td>
                           {item.activeStatus ? <td className=' text-green-400 px-8  rounded-lg'>Active</td> :
                              <td className=' text-red-500 px-8  rounded-lg'>InActive</td>}
                        </tr>

                     ))}
                  </>

               </tbody>
            </table>
         </div>
      </div>
      <Loader show={load}/>
      </>
   )
}

export default BottomBar
