import React, { useEffect, useState } from 'react';
import { SuppliersTable } from '../components/tables/SuppliersTable';
import { useDispatch, useSelector } from 'react-redux';
import { getSuppliers } from './../actions/suppliersAction';

export const Suppliers = () => {
    
    
    const [suppliersPerPage, setSuppliersPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortToggle, setSortToggle] = useState(true);
    const [searchName, setSearchName] = useState('');
    const {fetched, suppliers, totalPages} = useSelector(state => state.suppliers);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const sortDir = sortToggle ? 'asc' : 'desc';
                dispatch(getSuppliers(currentPage, suppliersPerPage, sortDir, searchName));
                
            } catch (error) {
                console.log(error);
                //setErrores(error);
            }
        }
        fetchData();
    }, [sortToggle, currentPage, dispatch, searchName, suppliersPerPage]);

    const sortSuppliers = () => {
        setSortToggle(!sortToggle);
    };

    if(fetched && currentPage > totalPages) {
        setCurrentPage(totalPages);
    }
    
    return (
        <>
            {
                fetched &&
                <SuppliersTable 
                    suppliers={suppliers}
                    sortToggle={sortToggle}
                    sortSuppliers={sortSuppliers}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setCurrentPage={setCurrentPage}
                    suppliersPerPage={suppliersPerPage}
                    setSuppliersPerPage={setSuppliersPerPage}
                    searchName={searchName}
                    setSearchName={setSearchName}
                />
            }
        </>
           
    );  
};
