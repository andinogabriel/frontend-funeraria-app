import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DeleteButton } from '../buttons/DeleteButton';
import { types } from './../../types/types';
import { ENTRIES_ENDPOINT } from '../../helpers/endpoints';
import { DataGrid } from '@mui/x-data-grid';
import { Edit } from '@mui/icons-material';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { getEntries } from './../../actions/entriesAction';


const columns = [
    { field: 'receiptNumber', headerName: 'Número de recibo', width: 200 },
    { field: 'receiptSeries', headerName: 'Número de serie', width: 200 },
    { field: 'entryDate', headerName: 'Fecha', width: 175, valueFormatter: (params) => dayjs(params.row?.entryDate).format('DD/MM/YYYY - HH:mm') + "hs."},
    { field: 'tax', headerName: 'Impuesto', width: 140, valueFormatter: (params) => params.row?.tax + "%"},
    { field: 'totalAmount', headerName: 'Monto total', width: 160, valueFormatter: (params) => '$' + params.row?.totalAmount },
    { field: 'entrySupplier', headerName: 'Proveedor', width: 160, valueFormatter: ({row}) => row?.entrySupplier?.name },
    {
      field: "action",
      headerName: "Acciones",
      disableColumnMenu: true,
      sortable: false,
      width: 100,
      renderCell: ({row}) => {
        return (
          <>
            <Link to={`/editar-ingreso/${row?.id}`}>
              <Edit/>
            </Link>
            <DeleteButton
              id={row.id}
              name={row.receiptNumber}
              thingToDelete="Ingreso"
              endpoint={ENTRIES_ENDPOINT}
              deleteType={types.entriesDeleted}
            />
          </>
        );
      },
    }
  ];

  

export const EntriesTable = () => {

    const dispatch = useDispatch();
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [error, setError] = useState(null);
    const {suppliers} = useSelector(state => state.suppliers);
    const { fetched, entries, totalElements } = useSelector(state => state.entries);

    useEffect(() => {
      dispatch(getEntries(setError, page, pageSize));
    }, [page, pageSize, fetched]);


    const handlePageSizeChange = (params) => {
      setPageSize(params.pageSize);
    };

    return (
        <div style={{ padding: 10 }}>
          <DataGrid
              rows={entries} columns={columns} 
              page={page}
              onPageChange={(params) => {
                setPage(params.page);
              }}
              pageSize={pageSize}
              onPageSizeChange={handlePageSizeChange}
              rowsPerPageOptions={[5, 10, 20]}
              pagination
              rowCount={fetched ? totalElements : 0}
              paginationMode="server"
              autoHeight
              loading={!fetched}
              disableSelectionOnClick
              showCellRightBorder
              showColumnRightBorder
          />
        </div>
       
    );
};
