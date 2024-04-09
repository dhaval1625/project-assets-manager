const _envMode = import.meta.env.MODE;
let _baseURL = 'https://project-assets-manager.onrender.com/';

if(_envMode === 'development') {
   _baseURL = 'http://localhost:8000/';
}

console.log('Mode - ' + _envMode);

export const BASE_URL = _baseURL;

// project routes
export const PROJECT_LIST_URL = BASE_URL + 'project/all';
export const PROJECT_ADD_URL = BASE_URL + 'project/add';
export const PROJECT_EDIT_URL = BASE_URL + 'project/edit?id=';
export const PROJECT_DELETE_URL = BASE_URL + 'project/delete?id=';
export const PROJECT_DETAILS_URL = BASE_URL + 'project/details/';

// auth routes
export const SIGNUP_URL = BASE_URL + 'auth/signup';
export const LOGIN_URL = BASE_URL + 'auth/login';