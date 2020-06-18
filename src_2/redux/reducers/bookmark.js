/**
 * @Description: Bookmark reducer
 * @Created by ZiniTeam
 * @Date create: 16/11/2018
 */
/** ACTIONS TYPE */
import * as actionTypes from '../actions/types';

const initialState = {
    data: null
};

export default function (state = initialState, action = {}) {
    switch (action.type) {
        case actionTypes.ASYNC_STORAGE_BOOKMARK:
            return {
                ...state,
                data: action.data,
            };
        case actionTypes.REMOVE_ALL_BOOKMARK:
            return {
                ...state,
                data: null,
            };        
        default:
            return state;
    }
}