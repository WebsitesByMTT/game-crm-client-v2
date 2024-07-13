import React from 'react';

const LoadingSkeleton = ({ LoadingStyle, count }) => {
    const skeletonArray = Array.from({ length: count });

    return (
        skeletonArray.map((_, index) => (
            <div key={index} role="status" className="animate-pulse ">
                <div className={`${LoadingStyle} bg-gray-300 dark:bg-gray-700`}></div>
            </div>
        ))

    );
};

export default LoadingSkeleton;
