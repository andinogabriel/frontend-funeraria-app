import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getBrands } from './../actions/brandsAction';
import { BrandsTable } from './../components/tables/BrandsTable';


export const Brands = () => {

    
    const [brandsPerPage, setBrandsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortToggle, setSortToggle] = useState(true);
    const [searchName, setSearchName] = useState('');
    const dispatch = useDispatch();
    const {fetched, brands, totalPages} = useSelector(state => state.brands);

    useEffect(() => {
        const fetchData = async() => {
            try {
                const sortDir = sortToggle ? 'asc' : 'desc';
                dispatch(getBrands(currentPage, brandsPerPage, sortDir, searchName));
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [sortToggle, currentPage, dispatch, searchName, brandsPerPage]);

    const sortBrands = () => {
        setSortToggle(!sortToggle);
    };

    if(fetched && currentPage > totalPages) {
        setCurrentPage(totalPages);
    }
    

    return (
        <>
            {
                fetched &&
                    <BrandsTable
                        brands={brands}
                        sortToggle={sortToggle}
                        sortBrands={sortBrands}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        totalPages={totalPages}
                        setSearchName={setSearchName}
                        searchName={searchName}
                        brandsPerPage={brandsPerPage}
                        setBrandsPerPage={setBrandsPerPage}
                    />
            }
        </>
    )
}
