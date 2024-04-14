import { Skeleton } from '@mui/material'
import React from 'react'

const SearchSkeleton = () => {
    return (
        <div className='search-skeleton'>
            <Skeleton animation="wave"  height={55}/>
        </div>
    )
}

export default SearchSkeleton
