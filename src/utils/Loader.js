import React from 'react'
import { BeatLoader, MoonLoader } from 'react-spinners'

const Loader = ({ show }) => {
    
    return (
       show&&<div className='absolute top-0 left-0 w-full h-full'>
            <div className='bg-black w-full h-screen relative bg-opacity-40'>
                <BeatLoader
                    color={'blue'}
                    loading={show}
                    size={25}
                    className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'
                />
            </div>
        </div>

    )
}

export default Loader
