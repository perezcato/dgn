/**
 * @Description: Post reducer
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
        case actionTypes.GET_POST:
            return {
                ...state,
                data: action.data || null
            };
        default:
            return state;
    }
}