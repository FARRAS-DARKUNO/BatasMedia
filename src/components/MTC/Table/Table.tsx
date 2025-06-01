import React, { useState } from 'react';



const products: (any)[][] = [
    [2, 'Microsoft Surface Pro', 'White', 'Laptop PC', 1999, 'AA', 'BB', 'CCC', 'DDDD'],
    [3, 'Microsoft Surface Pro', 'White', 'Laptop PC', 1998, 'AA', 'BB', 'CCC', 'DDDD'],
    [4, 'Microsoft Surface Pro', 'White', 'Laptop PC', 1990, 'AA', 'BB', 'CCC', 'DDDD'],
];
const header = ['Id', 'Product Name', 'Color', 'Category', 'Tahun', 'AA', 'BB', 'CCC', 'DDDD']

const MasterTable: React.FC = () => {
    const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const productsPerPage = 10;

    const toggleSelectAll = () => {
        if (selectedProducts.length === products.length) {
            setSelectedProducts([]);
        } else {
            setSelectedProducts(products.map((product) => product[0]));
        }
        console.log(selectedProducts)
    };

    const toggleSelectProduct = (id: number) => {
        setSelectedProducts((prevSelected) =>
            prevSelected.includes(id)
                ? prevSelected.filter((productId) => productId !== id)
                : [...prevSelected, id]
        );
        console.log(selectedProducts)
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const renderPageNumbers = () => {
        const totalPages = 30; // Assuming you have 5 pages
        const pages = [];

        // Always show the first two pages
        if (currentPage > 3) {
            pages.push(1, 2, '...');
        } else {
            pages.push(1, 2);
        }

        // Show current page if it's in between
        if (currentPage > 2 && currentPage < totalPages - 1) {
            pages.push(currentPage);
        }

        // Always show the last two pages
        if (currentPage < totalPages - 2) {
            pages.push('...', totalPages - 1, totalPages);
        } else {
            pages.push(totalPages - 1, totalPages);
        }

        return pages;
    };

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-text-light dark:text-text-dark">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th className="p-4 sticky left-0 bg-gray-50 dark:bg-gray-700 z-10">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={selectedProducts.length === products.length}
                                    onChange={toggleSelectAll}
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
                                />
                            </div>
                        </th>
                        <th className="px-6 py-3 sticky left-12 bg-gray-50 dark:bg-gray-700 z-10">Action</th>
                        {header.map((value, index) => (
                            <th key={index} className="px-6 py-3">{value}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {currentProducts.map((product) => (
                        <tr
                            key={product[0]}
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                            <td className="p-4 sticky left-0 bg-white dark:bg-gray-800">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={selectedProducts.includes(product[0])}
                                        onChange={() => toggleSelectProduct(product[0])}
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                </div>
                            </td>
                            <td className="flex px-6 py-4 gap-2 sticky left-12 bg-white dark:bg-gray-800">
                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fill-rule="evenodd" d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z" clip-rule="evenodd" />
                                    <path fill-rule="evenodd" d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z" clip-rule="evenodd" />
                                </svg>
                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fill-rule="evenodd" d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clip-rule="evenodd" />
                                </svg>
                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fill-rule="evenodd" d="M9 2.221V7H4.221a2 2 0 0 1 .365-.5L8.5 2.586A2 2 0 0 1 9 2.22ZM11 2v5a2 2 0 0 1-2 2H4v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-7ZM8 16a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H9a1 1 0 0 1-1-1Zm1-5a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H9Z" clip-rule="evenodd" />
                                </svg>
                            </td>
                            {product.map((value, index) => (
                                <td key={index} className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {value}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>

            </table>
            <nav
                className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 z-10  
                max-lg:flex-col max-lg:pt-5 max-lg:gap-4"
                aria-label="Table navigation">
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    Showing <span className="font-semibold text-gray-900 dark:text-white">1-10</span> of{' '}
                    <span className="font-semibold text-gray-900 dark:text-white">1000</span>
                </span>
                <ul className="inline-flex -space-x-px text-sm h-8">
                    <li>
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="flex items-center justify-center px-3 h-8 text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                            Previous
                        </button>
                    </li>
                    {renderPageNumbers().map((page, index) => (
                        <li key={index}>
                            {typeof page === 'number' ? (
                                <button
                                    onClick={() => handlePageChange(page)}
                                    className={`flex items-center justify-center px-3 h-8 ${currentPage === page
                                        ? 'text-blue-600 bg-blue-50'
                                        : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                                        }`}
                                >
                                    {page}
                                </button>
                            ) : (
                                <span className="flex items-center justify-center px-3 h-8 text-gray-500">...</span>
                            )}
                        </li>
                    ))}
                    <li>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === 30}
                            className="flex items-center justify-center px-3 h-8 text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                            Next
                        </button>
                    </li>
                </ul>
            </nav>

        </div>
    );
};

const Table = {
    MasterTable
}

export default Table;
