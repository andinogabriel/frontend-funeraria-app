import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ItemsTable } from '../components/tables/ItemsTable';
import { CATEGORIES_ENDPOINT } from '../helpers/endpoints';
import { getItems } from './../actions/itemsAction';

export const Items = () => {

    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortToggle, setSortToggle] = useState(true);
    const [searchName, setSearchName] = useState('');
    const [sortBy, setSortBy] = useState('name');
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState(undefined);
    const dispatch = useDispatch();
    const {fetched, items, totalPages} = useSelector(state => state.items);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resp = await axios.get(CATEGORIES_ENDPOINT);
                setCategories(resp.data);
                const sortDir = sortToggle ? 'asc' : 'desc';
                dispatch(getItems(categoryId, currentPage, itemsPerPage, sortBy, sortDir, searchName));
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [sortToggle, sortBy, currentPage, dispatch, searchName, itemsPerPage, categoryId]);

    
    const sortItems = (sortBy) => {
        setSortToggle(!sortToggle);
        setSortBy(sortBy);
    };

    if(fetched && currentPage > totalPages) {
        setCurrentPage(totalPages);
    }

    console.log(items);

    return (
        <>
            {
                fetched &&
                    <ItemsTable
                        items={items}
                        sortToggle={sortToggle}
                        sortItems={sortItems}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        totalPages={totalPages}
                        setSearchName={setSearchName}
                        searchName={searchName}
                        itemsPerPage={itemsPerPage}
                        setItemsPerPage={setItemsPerPage}
                        sortBy={sortBy}
                        categories={categories}
                        setCategoryId={setCategoryId}
                    />
            }
        </>
    );
};
