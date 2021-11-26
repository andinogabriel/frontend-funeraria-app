import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { userAffiliatesReducer } from './userAffiliatesReducer';
import { suppliersReducer } from './suppliersReducer';
import { itemsReducer } from './itemsReducer';
import { brandsReducer } from './brandsReducer';
import { categoriesReducer } from './categoriesReducer';
import { entriesReducer } from './entriesReducer';
import { receiptTypesReducer } from './receiptTypeReducer';


export default combineReducers({
    auth: authReducer,
    affiliates: userAffiliatesReducer,
    suppliers: suppliersReducer,
    items: itemsReducer,
    brands: brandsReducer,
    categories: categoriesReducer,
    entries: entriesReducer,
    receiptTypes: receiptTypesReducer
}); 
