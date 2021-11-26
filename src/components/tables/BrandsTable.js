import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { Edit } from '@mui/icons-material';
import { DeleteButton } from './../buttons/DeleteButton';
import { types } from './../../types/types';
import { BRANDS_ENDPOINT } from '../../helpers/endpoints';

const columns = [
    { field: 'name', headerName: 'Nombre', width: 250 },
    { field: 'webPage', headerName: 'Pagina web', width: 250 },
    {
      field: "action",
      headerName: "Acciones",
      disableColumnMenu: true,
      sortable: false,
      width: 100,
      renderCell: ({row}) => {
        return (
          <>
            <Link to={`/editar-marca/${row.id}`}>
              <Edit/>
            </Link>
            <DeleteButton
              id={row.id}
              name={row.name}
              thingToDelete="Marca"
              endpoint={BRANDS_ENDPOINT}
              deleteType={types.brandsDeleted}
            />
          </>
        );
      },
    }
  ];


export const BrandsTable = ({brands, fetched}) => {

    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);

    const handlePageSizeChange = (params) => {
      setPageSize(params.pageSize);
    };

    return (
        <div style={{ padding: 10 }}>
          <DataGrid 
            rows={brands} columns={columns} 
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
