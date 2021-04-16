import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { userAffiliatesReducer } from './userAffiliatesReducer';
import { suppliersReducer } from './suppliersReducer';


export default combineReducers({
    auth: authReducer,
    affiliates: userAffiliatesReducer,
    suppliers: suppliersReducer
}); 
