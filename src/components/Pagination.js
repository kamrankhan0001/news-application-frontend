
import React from 'react';

const Pagination = ({ currentPage, totalPages, setPage }) => {
    const prevPage = () => {
        if (currentPage > 1) {
            setPage(currentPage - 1);
        }
    };

    const nextPage = () => {
        if (currentPage < totalPages) {
            setPage(currentPage + 1);
        }
    };

    const renderPageNumbers = () => {
        let pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <button 
                    key={i} 
                    onClick={() => setPage(i)} 
                    className={`px-4 py-2 rounded-lg mx-1 ${
                        currentPage === i 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-blue-100'
                    }`}
                >
                    {i}
                </button>
            );
        }
        return pageNumbers;
    };

    return (
        <div className="flex justify-center items-center mt-8 space-x-2">
            {/* Previous Button */}
            <button 
                onClick={prevPage} 
                disabled={currentPage === 1} 
                className={`px-4 py-2 bg-gray-200 rounded-lg ${
                    currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-100'
                }`}
            >
                Previous
            </button>

            {/* Page Numbers */}
            <div className="flex space-x-2">
                {renderPageNumbers()}
            </div>

            {/* Next Button */}
            <button 
                onClick={nextPage} 
                disabled={currentPage === totalPages} 
                className={`px-4 py-2 bg-gray-200 rounded-lg ${
                    currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-100'
                }`}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
