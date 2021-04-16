import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DeleteSupplierButton } from '../buttons/DeleteSupplierButton';
import { Button, Table } from 'react-bootstrap';
import { SupplierInfo } from '../../pages/SupplierInfo';


export const TableSuppliers = ({ suppliers}) => {
    
    return (
        <>
            <h1 className="mt-5">Proveedores</h1>
                <Table responsive="xl" size="sm" striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>NIF</th>
                            <th>Email</th>
                            <th>Página web</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            suppliers.map((supplier) => (
                                <tr key={supplier.id} >
                                    <td>{supplier.name}</td>
                                    <td>{supplier.nif}</td>
                                    <td>{supplier.email}</td>
                                    <td>{supplier.webPage}</td>
                                    <td>
                                        <div className="d-flex justify-content-between">
                                            
                                            <SupplierInfo
                                                supplier={supplier}
                                            />

                                            <Button 
                                                variant="primary" 
                                                size="sm"  
                                                className="mr-2"
                                                as={NavLink} to={`/editar-proveedor/${supplier.id}`}
                                            >
                                                <FontAwesomeIcon icon={['fas', 'edit']} />
                                            </Button>
                                            <DeleteSupplierButton
                                                id={supplier.id}
                                                name={supplier.name}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
                <Button 
                    variant="secondary" 
                    size="lg" block
                    as={NavLink} to="/proveedor-formulario"
                > 
                    Agregar proveedor
                </Button>
                {
                    // errores &&
                    // <div className="text-danger text-small d-block mb-2 ml-3 col-lg-12 mb-4">
                    //     {errores}
                    // </div>
                }
        </>
    );
}
