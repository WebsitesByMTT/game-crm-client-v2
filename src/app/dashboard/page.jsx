import BottomBar from '@/components/dashborad/BottomBar'
import LeftSideBar from '@/components/dashborad/LeftSideBar'
import Pagination from '@/components/dashborad/Pagination'
import TopBar from '@/components/dashborad/TopBar'
import React from 'react'

const page = () => {
  return (
    <div className='grid grid-cols-12 h-screen grid-rows-12'>
       <div className=' p-2  row-span-12 col-span-2'>
         <LeftSideBar />
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
