import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AsyncPaginate } from "react-select-async-paginate";
import { CITIES_ENDPOINT } from '../helpers/endpoints';

export const SelectAsyncPaginate = ({provinceName, value, onChangeProvince}) => {

    const [provincia, setProvincia] = useState(null);

    useEffect(() => {
        setProvincia(provinceName);
    }, [provinceName]);

    const loadOptions = async (searchQuery, loadedOptions, { page }) => {

        const response = await axios.get(`${CITIES_ENDPOINT}/${provincia}?page=${page}&sortBy=name&sortDir=desc`);
        const {content} = response.data;
        
        return {
        options: content,
        hasMore: content.length >= 1,
        additional: {
            page: searchQuery ? 2 : page + 1,
        },
        };
    };
    
    const onChange = (option) => {
        if (typeof onChangeProvince === "function") {
            onChangeProvince(option);
        }
    };


    

    return (
        <AsyncPaginate
            key={JSON.stringify(provincia)}
            value={value || ""}
            loadOptions={loadOptions}
            getOptionValue={(option) => option.name}
            getOptionLabel={(option) => option.name}
            onChange={onChange}
            isSearchable={false}
            placeholder="Seleccionar ciudad"
            additional={{
                page: 1,
            }}
        />
    )
}
