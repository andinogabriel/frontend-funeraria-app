import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { Edit } from '@mui/icons-material';
import { DeleteButton } from './../buttons/DeleteButton';
import { types } from './../../types/types';
import { CATEGORIES_ENDPOINT } from '../../helpers/endpoints';

const columns = [
    { field: 'name', headerName: 'Nombre', width: 200 },
    { field: 'description', headerName: 'Descripción', width: 300 },
    {
      field: "action",
      headerName: "Acciones",
      disableColumnMenu: true,
      sortable: false,
      width: 100,
      renderCell: ({row}) => {
        return (
          <>
            <Link to={`/editar-categoria/${row.id}`}>
              <Edit/>
            </Link>
            <DeleteButton
              id={row.id}
              name={row.name}
              thingToDelete="Categoría"
              endpoint={CATEGORIES_ENDPOINT}
              deleteType={types.categoryDeleted}
            />
          </>
        );
      },
    }
];

export const CategoriesTable = ({categories, isLoading}) => {

    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);

    const handlePageSizeChange = (params) => {
      setPageSize(params.pageSize);
    };

    return (
        <div style={{ padding: 10 }}>
            <DataGrid 
                rows={categories} columns={columns} 
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
                loading={isLoading}
            />
      </div>
    );
};
