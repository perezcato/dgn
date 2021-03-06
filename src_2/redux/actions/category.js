/**
 * @Description: Category actions
 * @Created by ZiniTeam
 * @Date create: 16/11/2018
 */
import * as actionTypes from './types';

export const getAllCategory = (data) => ({ type: actionTypes.GET_ALL_CATEGORY, data: data });
export const removeAllCategory = (data) => ({ type: actionTypes.REMOVE_ALL_CATEGORY });