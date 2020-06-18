/**
 * @Description: Category reducer
 * @Created by ZiniTeam
 * @Date create: 16/11/2018
 */
/** ACTION TYPE */
import * as actionTypes from '../actions/types';

const initialState = {
  data: null,
};

export default function (state = initialState, action = {}) {
    switch (action.type) {
        case actionTypes.GET_ALL_CATEGORY:
            return {
                ...state,
                data: action.data || null
            };
        case actionTypes.REMOVE_ALL_CATEGORY:
            return {
                ...state,
                data: null
            };
        default:
            return state;
    }
}