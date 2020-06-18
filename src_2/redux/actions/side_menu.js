/**
 * @Description: Side Menu actions
 * @Created by ZiniTeam
 * @Date create: 16/11/2018
 */
import * as actionTypes from './types';

export const changeSideMenu = (params) => ({ type: actionTypes.SIDE_MENU_CHANGE, data: params });
export const removeSideMenu = (params) => ({ type: actionTypes.REMOVE_SIDE_MENU });