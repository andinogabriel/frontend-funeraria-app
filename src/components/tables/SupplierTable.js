import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { SUPPLIERS_ENDPOINT } from '../../helpers/endpoints';
import { Edit } from '@mui/icons-material';
import { SupplierInfo } from '../../pages/SupplierInfo';
import { DeleteButton } from '../buttons/DeleteButton';
import { types } from '../../types/types';


const columns = [
  { field: 'name', headerName: 'Nombre', width: 150 },
  { field: 'nif', headerName: 'NIF', width: 200 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'webPage', headerName: 'Pagina web', width: 200 },
  {
    field: "action",
    headerName: "Acciones",
    disableColumnMenu: true,
    sortable: false,
    width: 100,
    renderCell: ({row}) => {
      return (
        <>
          <SupplierInfo supplier={row}/>
          <Link to={`/editar-proveedor/${row.id}`}>
            <Edit/>
          </Link>
          <DeleteButton
            id={row.id}
            name={row.name}
            thingToDelete="Proveedor"
            endpoint={SUPPLIERS_ENDPOINT}
            deleteType={types.suppliersDeleted}
          />
        </>
      );
    },
  }
];


export const SupplierTable = ({suppliers, fetched}) => {

    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);

    const handlePageSizeChange = (params) => {
      setPageSize(params.pageSize);
    };

    return (
      <div style={{ padding: 10 }}>
        <DataGrid 
          rows={suppliers} columns={columns} 
          page={page}
          onPageChange={(params) => {
            setPage(params.page);
          }}
          pageSize={pageSize}
          onPageSizeChange={handlePageSizeChange}
          rowsPerPageOptions={[5, 10, 20]}
          pagination
          autoHeight
          disableSelectionOnClick
          showCellRightBorder
          showColumnRightBorder
          loading={!fetched}
        />
      </div>
    );
};
