import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Pagination} from '@material-ui/lab';


const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        marginTop: theme.spacing(2),
        float: 'right'
      },
    },
  }));

export const Paginator = ({totalPages, currentPage = 1, setCurrentPage}) => {
    
    const classes = useStyles();
    
    const onChange = (e, page) => {
        e.preventDefault();
        setCurrentPage(page);
    };

    return (
        <div className={classes.root}>
            <Pagination count={totalPages} 
                showFirstButton 
                showLastButton 
                page={currentPage}
                onChange={(e, page)=> onChange(e, page)}
            />
        </div>
    );
};
