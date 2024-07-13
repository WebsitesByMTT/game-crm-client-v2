import GameList from '@/components/GameList'
import React from 'react'

const page = ({params}) => {
    return (<GameList platforms={params?.platform} />)
}

export default page
    