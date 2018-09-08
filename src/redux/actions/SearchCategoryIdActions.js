import { SET_SEARCH_CATEGORY_ID, CLEAR_SEARCH_CATEGORY_ID } from './types'


export const setSearchCategoryId = (categoryId) => 
    ({type: SET_SEARCH_CATEGORY_ID, payload: categoryId})


export const clearSearchCategoryId = () => ({type: CLEAR_SEARCH_CATEGORY_ID})