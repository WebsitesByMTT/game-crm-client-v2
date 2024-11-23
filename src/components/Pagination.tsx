import React, { useEffect, useState } from 'react'
import Arrow_Left from './svg/Arrow_Left'
import Arrow_Right from './svg/Arrow_Right'
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

const Pagination = ({ paginationData }: any) => {
    const pathname = usePathname()
    const router = useRouter()
    const [currentPage, setCurrentPage] = useState<number>(paginationData?.currentPage);
   
    // Function to handle previous page
    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    // Function to handle next page
    const handleNext = () => {
        if (currentPage < paginationData?.totalPage) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    useEffect(() => {
        router?.replace(`${pathname}?page=${currentPage || 1}&search=${paginationData?.search || ''}&From=${paginationData?.From}&To=${paginationData?.To}`)
    }, [currentPage])

    useEffect(() => {
        setCurrentPage(paginationData?.currentPage)
    },[paginationData?.currentPage])

    return (
        <div className='flex justify-end dark:text-white text-gray-600 pt-3 pb-4 pr-2'>
            <div className='flex items-center transition-all space-x-2'>
                <button
                    onClick={handlePrev}
                    disabled={currentPage === (1 || 0)}
                    className={`dark:hover:text-[#8C7CFD] hover:text-[#8C7CFD] text-black dark:text-white ${currentPage === 1 ? 'opacity-50' : ''}`}
                >
                    <Arrow_Left />
                </button>
                <span className='text-sm'>Page</span>
                <span className='text-[#8C7CFD]'>{paginationData?.currentPage || currentPage}</span>
                <span className='text-sm'>Of</span>
                <span className='text-[#8C7CFD]'>{paginationData?.totalPage}</span>
                <button
                    onClick={handleNext}
                    disabled={currentPage === paginationData?.totalPage}
                    className={`dark:hover:text-[#8C7CFD] hover:text-[#8C7CFD] text-black dark:text-white ${currentPage === paginationData?.totalPage ? 'opacity-50' : ''}`}
                >
                    <Arrow_Right />
                </button>
            </div>
        </div>
    );
};

export default Pagination;
