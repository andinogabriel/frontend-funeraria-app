import React, { useState } from 'react';
import { Pagination } from 'react-bootstrap';

export const Paginator = ({totalPages, currentPage = 1, setCurrentPage}) => {
    
    const [pageNumberLimit, setPageNumberLimit] = useState(2);
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(2);
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

    const pages = []; //Vamos a tener un array de numeros, osea de la cantidad de paginas total que podemos paginar
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    //Generamos n items de paginacion dependiendo de la cantidad de paginas que traemos de la API
    const renderPageNumbers = pages.map(number => {
        if(number < maxPageNumberLimit+1 && number > minPageNumberLimit) {
            return (
                <Pagination.Item 
                    key={number} id={number} 
                    onClick={() => setCurrentPage(number)}
                    active={currentPage === number}
                    >
                        {number}
                </Pagination.Item>
            );
        } else {
            return null;
        }
    });

    const nextPage = () => {
        setCurrentPage(page => page + 1);
        if(currentPage + 1 > maxPageNumberLimit) {
            setMaxPageNumberLimit(maxPageNumberLimit+pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit+pageNumberLimit);
        }
    };

    const prevPage = () => {
        setCurrentPage(page => page - 1);
        if((currentPage - 1) % pageNumberLimit === 0) {
            setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
        }
    };

    const lastPage = () => {
        setCurrentPage(totalPages);
    }

    //Esto genera los ... para sabes que hay mas paginas despues de la actual
    let pageIncrementBtn = null;
    if(pages.length > maxPageNumberLimit) {
        pageIncrementBtn = <Pagination.Ellipsis onClick={nextPage} disabled={currentPage === totalPages ? true : false}/>
    }

    //Esto genera los ... para sabes que hay mas paginas atras de la actual
    let pageDecrementBtn = null;
    if(minPageNumberLimit >= 1) {
        pageDecrementBtn = <Pagination.Ellipsis onClick={prevPage} disabled={currentPage === 1 ? true : false}/>
    }

    return (
        <Pagination>
            <Pagination.First 
                onClick={() => setCurrentPage(1)} 
                disabled={currentPage === 1 ? true : false}
            />
            <Pagination.Prev 
                onClick={prevPage}
                disabled={currentPage === 1 ? true : false}
            />
            {pageDecrementBtn}
            {renderPageNumbers}
            {pageIncrementBtn}
            <Pagination.Next 
                onClick={nextPage}
                disabled={currentPage === totalPages ? true : false}
            />
            <Pagination.Last 
                onClick={lastPage}
                disabled={currentPage === totalPages ? true : false}
            />
        </Pagination>
    )
}
