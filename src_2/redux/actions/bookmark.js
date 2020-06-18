/**
 * @Description: Bookmark actions
 * @Created by ZiniTeam
 * @Date create: 16/11/2018
 */
import * as actionTypes from './types';

export const addAndRemoveASBM = (params) => ({ type: actionTypes.ASYNC_STORAGE_BOOKMARK, payload: params });
export const removerBookMark = () => ({ type: actionTypes.REMOVE_ALL_BOOKMARK });