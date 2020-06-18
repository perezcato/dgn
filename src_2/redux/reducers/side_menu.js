/**
 * @Description: Side Menu reducer
 * @Created by ZiniTeam
 * @Date create: 16/11/2018
 */
/** ACTION TYPE */
import * as actionTypes from '../actions/types';

const initialState = {
    name: 'News',
    id: 'news'
};

export default function (state = initialState, action = {}) {
    switch (action.type) {
        case actionTypes.SIDE_MENU_CHANGE:
            return {
                ...state,
                name: action.data.name,
                id: action.data.id,
            };
        case actionTypes.REMOVE_SIDE_MENU:
            return {
                ...state,
                name: 'News',
                id: 'news',
            };
        default:
            return state;
    }
}