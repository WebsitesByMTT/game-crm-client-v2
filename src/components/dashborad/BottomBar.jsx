import React from 'react'

const BottomBar = () => {
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
                 <tr className='text-center text-white'>
                    <td className='py-2'>
                        <button>Update</button>
                    </td>
                    <td>Ashish</td>
                    <td>Ashish</td>
                    <td className='capitalize'>master</td>
                    <td>100</td>
                    <td>Active</td>
                 </tr>
              </tbody>
           </table>
       </div>
    </div>
  )
}

export default BottomBar
