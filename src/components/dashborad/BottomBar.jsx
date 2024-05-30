import { GetClientDataApi } from '@/apiConfig/apis'
import { ClientData, UpdateTable } from '@/redux/ReduxSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const BottomBar = ({ data }) => {
   const dispatch=useDispatch()
   const tabelstate=useSelector((state)=>state.globlestate.TableState)

   const [state, setState] = useState([])
   const handelClientList = async () => {
      const clientdata =
      {
         pageNumber: 1,
         isAll: true,
         username: data?.username
      }
      if(data?.username){
         try {
            const response = await GetClientDataApi(clientdata)
            if (response.status === 200) {
               setState(response.data.userClientList)
               dispatch(UpdateTable(false))  
            }  
         } catch (error) {
   
         }
      }
   
   }
   useEffect(() => {
      handelClientList()
   }, [tabelstate||data])

   const handelUpdate=(item)=>{
      dispatch(ClientData(item))
      toast(`Switched to ${item?.username}`,{type:'success'})
   }

   return (
      <div className='p-2 h-full'>
         <div className='py-5 bg-gradient-to-r h-full from-cyan-500 rounded-xl to-blue-500 px-10'>
            <table className='w-full'>
               <thead>
                  <tr>
                     <th>Management</th>
                     <th>User Name</th>
                     <th>Nick Name</th>
                     <th>Designation</th>
                     <th>Credits</th>
                     <th>Status</th>
                  </tr>
               </thead>
               <tbody>
                  {
                     state?.map((item, ind) => (
                        <tr key={ind} className='text-center text-white'>
                           <td className='py-2'>
                              <button onClick={ ()=>handelUpdate(item)} className='bg-indigo-500 text-white px-8 py-2 rounded-lg'>Update</button>
                           </td>
                           <td>{item.username}</td>
                           <td>{item.nickName}</td>
                           <td className='capitalize'>{item.designation}</td>
                           <td>{item.credits}</td>
                           {item.activeStatus?<td className=' text-green-400 px-8  rounded-lg'>Active</td>:
                           <td className=' text-red-500 px-8  rounded-lg'>InActive</td>}
                        </tr>
                     ))
                  }
               </tbody>
            </table>
         </div>
      </div>
   )
}

export default BottomBar
