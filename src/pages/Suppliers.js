import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SuppliersTable } from '../components/tables/SuppliersTable';
import { Paginator } from '../components/Paginator';
import { useDispatch, useSelector } from 'react-redux';
import { getSuppliers } from './../actions/suppliersAction';
import { Searcher } from '../components/Searcher';
import { QuantityDropdown } from '../components/QuantityDropdown';


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
                    <Card className="border border-dark bg-dark text-white mt-5">
                        <Card.Header>
                            <div style={{"float":"left"}}>
                                <FontAwesomeIcon icon={['fas', 'list']}/><b> Proveedores</b> 
                            </div>
                            <div style={{"float":"right"}}>
                                <Searcher
                                    searchThing={searchName}
                                    setSearchName={setSearchName}
                                    thingToSearch="nombre"
                                />
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <SuppliersTable 
                                suppliers={suppliers}
                                sortToggle={sortToggle}
                                sortSuppliers={sortSuppliers}
                            />
                        </Card.Body>
                    {
                        suppliers?.length > 0 ?
                            <Card.Footer>
                                <div style={{"float":"left"}}>
                                    Pagina {currentPage} de {totalPages}
                                    <QuantityDropdown
                                        setSuppliersPerPage={setSuppliersPerPage}
                                        things="proveedores"
                                    />
                                </div>
                                <div style={{"float":"right"}}>
                                    <Paginator
                                        totalPages={totalPages}
                                        currentPage={currentPage}
                                        setCurrentPage={setCurrentPage}
                                    />
                                </div>
                                
                        </Card.Footer> : null
                }
                </Card>
                
            }
        </>
    );  
};
