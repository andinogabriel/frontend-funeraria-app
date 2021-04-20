import React from 'react'
import { DropdownButton, Dropdown } from 'react-bootstrap';


export const QuantityDropdown = ({setSuppliersPerPage, things}) => {


    return (
        <DropdownButton id="dropdown-basic-button" title={`Cantidad de ${things}`} variant="outline-info" size="sm">
            <Dropdown.Item eventKey="5" onSelect={() => setSuppliersPerPage(5)}>5</Dropdown.Item>
            <Dropdown.Item eventKey="10" onSelect={() => setSuppliersPerPage(10)}>10</Dropdown.Item>
            <Dropdown.Item eventKey="15" onSelect={() => setSuppliersPerPage(15)}>15</Dropdown.Item>
        </DropdownButton>
    );
};
