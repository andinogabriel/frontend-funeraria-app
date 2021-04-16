import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { getUserAffiliates } from './../actions/affiliatesActions';
import dayjs from 'dayjs';



export const Affiliates = () => {

    const {fetched, affiliates} = useSelector(state => state.affiliates);
    const dispatch = useDispatch();
    const [errors, setErrors] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(getUserAffiliates());

            } catch (error) {
                console.log(error);
                setErrors(error);
            }
        }
        fetchData();
    }, [dispatch]);

    return (
        <>
            { 
                fetched &&
                <>
                <Table striped bordered hover variant="dark" className="mt-5" responsive="sm">
                    <thead>
                        <tr>
                            <th>Apellido</th>
                            <th>Nombre</th>
                            <th>DNI</th>
                            <th>Edad</th>
                            <th>Parentesco</th>
                            <th>Genero</th>
                            <th>Fecha de afiliación</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            affiliates.map(affiliate => (
                                <tr key={affiliate.affiliateId}>
                                    <td>{affiliate.lastName}</td>
                                    <td>{affiliate.firstName}</td>
                                    <td>{affiliate.dni}</td>
                                    <td>{new Date().getFullYear() - new Date(affiliate.birthDate).getFullYear()}</td>
                                    <td>{affiliate.affiliateRelationship.name}</td>
                                    <td>{affiliate.genderAffiliate.name}</td>
                                    <td>{dayjs(affiliate.startDate).format('DD/MM/YYYY')}</td>
                                </tr>
                               
                            ))
                        }
                    </tbody>
                </Table>
                <Button 
                    variant="secondary" 
                    size="lg" block
                    as={NavLink} to="/afiliado-form"
                > 
                    Agregar afiliado
                </Button>
                </>
            }
        </>
    );
};
