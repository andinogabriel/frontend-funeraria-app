import axios from 'axios';
import { ADDRESSES_ENDPOINT, CATEGORIES_ENDPOINT, MOBILE_NUMBERS_ENDPOINT, SUPPLIERS_ENDPOINT } from './endpoints';


export const SUPPLIERS_QUERY_KEY = 'suppliers';
export const CATEGORIES_QUERY_KEY = 'categories';
export const ADDRESS_QUERY_KEY = 'addresses';
export const MOBILE_NUMBER_QUERY_KEY = 'mobileNumbers';

export const getAllSuppliers = () => axios.get(SUPPLIERS_ENDPOINT).then(res => res.data);
export const getAllCategories = () => axios.get(CATEGORIES_ENDPOINT).then(res => res.data);
export const updateCategory = ({id, ...updatedCategory}) => axios.put(`${CATEGORIES_ENDPOINT}/${id}`, updatedCategory).then(res => res.data);
export const createMobileNumber = (mobileNumber) => axios.post(MOBILE_NUMBERS_ENDPOINT, mobileNumber).then(res => res.data);

export const createAddress = async (address) => {
    let { apartment, blockStreet, city, flat, streetName, supplierAddress } = address;
    city = city?.id;
    const res = await axios.post(ADDRESSES_ENDPOINT, { apartment, blockStreet, city, flat, streetName, supplierAddress });
    return res.data;
};


