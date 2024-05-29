"use client"
import { GetUserDataApi } from '../../apiConfig/apis'
import BottomBar from '@/components/dashborad/BottomBar'
import LeftSideBar from '@/components/dashborad/LeftSideBar'
import Pagination from '@/components/dashborad/Pagination'
import TopBar from '@/components/dashborad/TopBar'
import { useEffect, useState } from 'react'

const page = () => {

   const [data,setData]=useState()
    const handelUserData=async()=>{
      try {
         const response=await GetUserDataApi()
         if(response.status===200){
            setData(response.data)
         }
      } catch (error) {
         
      }
    }
   useEffect(()=>{
handelUserData()
   },[])
  return (
    <div className='grid grid-cols-12 h-screen grid-rows-12'>
       <div className=' p-2  row-span-12 col-span-2'>
         <LeftSideBar data={data}/>
       </div>
       <div className='col-span-10 row-span-5'>
          <TopBar />
       </div>
       <div className='col-span-10 row-span-6'>
          <BottomBar />
       </div>
       <div className='col-span-10 row-span-1'>
          <Pagination />
       </div>
    </div>
  )
}

export default page
