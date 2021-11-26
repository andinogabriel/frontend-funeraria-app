import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DeleteButton } from '../buttons/DeleteButton';
import { ItemInfo } from '../../pages/ItemInfo';
import { types } from './../../types/types';
import { ITEMS_ENDPOINT } from '../../helpers/endpoints';
import { DataGrid } from '@mui/x-data-grid';
import { Edit } from '@mui/icons-material';


const columns = [
    { field: 'name', headerName: 'Nombre', width: 200 },
    { field: 'price', headerName: 'Precio', width: 125 },
    { field: 'category', headerName: 'Categoría', width: 140, valueFormatter: (params) => params.row?.category?.name 
    },
    { field: 'brand', headerName: 'Marca', width: 200, valueFormatter: (params) => params.row?.brand?.name 
    },
    { field: 'stock', headerName: 'Stock', width: 200 },
    {
      field: "action",
      headerName: "Acciones",
      disableColumnMenu: true,
      sortable: false,
      width: 100,
      renderCell: ({row}) => {
        return (
          <>
            <ItemInfo item={row}/>
            <Link to={`/editar-articulo/${row.id}`}>
              <Edit/>
            </Link>
            <DeleteButton
              id={row.id}
              name={row.name}
              thingToDelete="Arcticulo"
              endpoint={ITEMS_ENDPOINT}
              deleteType={types.itemsDeleted}
            />
          </>
        );
      },
    }
  ];


export const ItemsTable = ({items, fetched}) => {

    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);

    const handlePageSizeChange = (params) => {
      setPageSize(params.pageSize);
    };

    return (
        <div style={{ padding: 10 }}>
            <DataGrid
                rows={items} columns={columns} 
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
