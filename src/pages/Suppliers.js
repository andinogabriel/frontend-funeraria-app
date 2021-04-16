import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSuppliers } from './../actions/suppliersAction';
import { TableSuppliers } from './../components/tables/TableSuppliers';


export const Suppliers = () => {

    const dispatch = useDispatch();
    const {fetched, suppliers} = useSelector(state => state.suppliers);

    //const [errores, setErrores] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(getSuppliers());
            } catch (error) {
                console.log(error);
                //setErrores(error);
            }
        };
        fetchData();
    }, [dispatch]);

    return (
        <>
            {
                fetched &&
                <>
                    <TableSuppliers suppliers={suppliers}/>
                </>
            }
            
        </>
    );  
};
